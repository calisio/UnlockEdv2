package handlers

// func TestOpenContentActivityHandler(t *testing.T) {
// httpTests := []httpTest{
// 		{"TestGetOpenContentActivityAsUser", "student", map[string]any{"id": "4"}, http.StatusOK, ""}
// }
// 	for _, test := range httpTests {
// 		t.Run(test.testName, func(t *testing.T) {
// 			req, err := http.NewRequest(http.MethodGet, "/api/open-content-activity%v", test.queryParams)
// 			if err != nil {
// 				t.Fatalf("unable to create new request, error is %v", err)
// 			}
// 			handler := getHandlerByRole(server.handleIndexOpenContentActivity, test.role)
// 			rr := executeRequest(t, req, handler, test)
// 			if rr.Header().Get("Content-Type") != "application/json" {
// 				t.Error("unexpected repsonse, we expected a photo to be served but did not get one")
// 			}
// 		})
// 	}

// }
