package handlers

import (
	"net/http"
	"strconv"
)

func (srv *Server) registerOpenContentActivityRoutes() {
	srv.Mux.Handle("GET /api/open-content/activity", srv.applyMiddleware(srv.handleGetTopFacilityOpenContent))
	srv.Mux.Handle("GET /api/open-content/activity/{id}", srv.applyMiddleware(srv.handleGetTopUserOpenContent))
}

func (srv *Server) handleGetTopFacilityOpenContent(w http.ResponseWriter, r *http.Request, log sLog) error {
	facilityId := srv.getFacilityID(r)
	topOpenContent, err := srv.Db.GetTopFacilityOpenContent(int(facilityId))
	if err != nil {
		return newDatabaseServiceError(err)
	}
	return writeJsonResponse(w, http.StatusOK, topOpenContent)
}

func (srv *Server) handleGetTopUserOpenContent(w http.ResponseWriter, r *http.Request, log sLog) error {
	id, err := strconv.Atoi(r.PathValue("id"))
	if err != nil {
		return newInvalidIdServiceError(err, "user ID")
	}
	topOpenContent, err := srv.Db.GetTopUserOpenContent(id)
	if err != nil {
		return newDatabaseServiceError(err)
	}
	return writeJsonResponse(w, http.StatusOK, topOpenContent)
}
