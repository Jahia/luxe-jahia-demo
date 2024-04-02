"use strict";
(self["webpackChunkluxe_jahia_demo"] = self["webpackChunkluxe_jahia_demo"] || []).push([["src_client_hasPermission_js"],{

/***/ "./src/client/hasPermission.js":
/*!*************************************!*\
  !*** ./src/client/hasPermission.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasPermission: () => (/* binding */ hasPermission)
/* harmony export */ });
const hasPermission = async (permission, path) => {
    const response = await fetch('/modules/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query {
                jcr {
                    nodeByPath(path: "${path}") {
                        site {
                            hasPermission(permissionName: "${permission}")
                        }
                    }
                }
            }`})
    });

    const data = await response.json();
    return data.data.jcr.nodeByPath.site.hasPermission;
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2NsaWVudF9oYXNQZXJtaXNzaW9uX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLEtBQUs7QUFDN0M7QUFDQSw2REFBNkQsV0FBVztBQUN4RTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEVBQUU7QUFDZixLQUFLOztBQUVMO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2x1eGUtamFoaWEtZGVtby8uL3NyYy9jbGllbnQvaGFzUGVybWlzc2lvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgaGFzUGVybWlzc2lvbiA9IGFzeW5jIChwZXJtaXNzaW9uLCBwYXRoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL21vZHVsZXMvZ3JhcGhxbCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnYWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBxdWVyeTogYHF1ZXJ5IHtcbiAgICAgICAgICAgICAgICBqY3Ige1xuICAgICAgICAgICAgICAgICAgICBub2RlQnlQYXRoKHBhdGg6IFwiJHtwYXRofVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNQZXJtaXNzaW9uKHBlcm1pc3Npb25OYW1lOiBcIiR7cGVybWlzc2lvbn1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1gfSlcbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgcmV0dXJuIGRhdGEuZGF0YS5qY3Iubm9kZUJ5UGF0aC5zaXRlLmhhc1Blcm1pc3Npb247XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9