package server

import (
	"context"
	"net/http"
	"strconv"

	"github.com/pkg/errors"
	"github.com/zhashkevych/go-pocket-sdk"
	"go.uber.org/zap"
	"tg_bot/pkg/storage"
)

type AuthServer struct {
	httpServer   *http.Server
	logger       *zap.Logger
	storage      storage.TokenStorage
	pocketClient *pocket.Client
	redirectURL  string
}

func NewAuthServer(redirectURL string, storage storage.TokenStorage, client *pocket.Client) *AuthServer {
	logger, _ := zap.NewDevelopment(zap.Fields(zap.String("app", "authorization_server")))
	return &AuthServer{
		redirectURL:  redirectURL,
		storage:      storage,
		pocketClient: client,
		logger:       logger,
	}
}

func (s *AuthServer) Start() error {
	s.httpServer = &http.Server{
		Handler: s,
		Addr:    ":80",
	}
	defer s.logger.Sync()
	return s.httpServer.ListenAndServe()
}

func (s *AuthServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		s.respondWithError(w, http.StatusForbidden, "invalid HTTP method", zap.String("method", r.Method))
		return
	}

	chatID, err := s.parseChatID(r)
	if err != nil {
		s.respondWithError(w, http.StatusBadRequest, err.Error())
		return
	}

	if err := s.createAccessToken(r.Context(), chatID); err != nil {
		s.respondWithError(w, http.StatusInternalServerError, "failed to create access token", zap.Error(err))
		return
	}

	http.Redirect(w, r, s.redirectURL, http.StatusMovedPermanently)
}

func (s *AuthServer) parseChatID(r *http.Request) (int64, error) {
	chatIDQuery := r.URL.Query().Get("chat_id")
	if chatIDQuery == "" {
		return 0, errors.New("missing chat_id query param")
	}

	chatID, err := strconv.ParseInt(chatIDQuery, 10, 64)
	if err != nil {
		return 0, errors.Errorf("invalid chat_id: %s", chatIDQuery)
	}
	return chatID, nil
}

func (s *AuthServer) createAccessToken(ctx context.Context, chatID int64) error {
	requestToken, err := s.storage.Get(chatID, storage.RequestTokens)
	if err != nil {
		return errors.WithMessage(err, "failed to get request token")
	}
	authResp, err := s.pocketClient.Authorize(ctx, requestToken)
	if err != nil {
		return errors.WithMessage(err, "failed to authorize at Pocket")
	}

	if err := s.storage.Save(chatID, authResp.AccessToken, storage.AccessTokens); err != nil {
		return errors.WithMessage(err, "failed to save access token to storage")
	}

	return nil
}

func (s *AuthServer) respondWithError(w http.ResponseWriter, statusCode int, msg string, fields ...zap.Field) {
	s.logger.Debug(msg, fields...)
	w.WriteHeader(statusCode)
}
