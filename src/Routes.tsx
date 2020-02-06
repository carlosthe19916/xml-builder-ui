import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound403 from "./PresentationalComponents/Pages/Forbidden403";
import NotFound404 from "./PresentationalComponents/Pages/NotFound404";
import ServiceUnavailable503 from "./PresentationalComponents/Pages/ServiceUnavailable503";
import HomePage from "./PresentationalComponents/Pages/HomePage";
import KeysPage from "./PresentationalComponents/Pages/KeysPage";
import OrganizationListPage from "./PresentationalComponents/Pages/OrganizationListPage";
import OrganizationPage from "./PresentationalComponents/Pages/OrganizationPage";
import DocumentsPage from "./PresentationalComponents/Pages/DocumentsPage";
import { isAppInSignerMode } from "./Utilities/EnvUtils";

const XmlBuilderRoute = (params: any) => {
  const { component: Component, forSignerMode, ...rest } = params;
  if (isAppInSignerMode() === forSignerMode) {
    return <Route {...rest} component={Component} />;
  }
  return null;
};

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/home" component={HomePage} />

      <XmlBuilderRoute
        path="/documents/create"
        component={DocumentsPage}
        exact
        forSignerMode={false}
      />

      <XmlBuilderRoute
        path="/organizations/list"
        component={OrganizationListPage}
        forSignerMode={true}
      />
      <XmlBuilderRoute
        path="/organizations/create"
        component={OrganizationPage}
        forSignerMode={true}
      />
      <XmlBuilderRoute
        path="/organizations/edit/:organizationId"
        component={OrganizationPage}
        forSignerMode={true}
      />
      <XmlBuilderRoute
        path="/organizations/manage/:organizationId/keys"
        component={KeysPage}
        forSignerMode={true}
      />
      <XmlBuilderRoute
        path="/organizations/documents/:organizationId/create"
        component={DocumentsPage}
        forSignerMode={true}
      />

      <Route path="/error/403" component={NotFound403} />
      <Route path="/error/404" component={NotFound404} />
      <Route path="/error/503" component={ServiceUnavailable503} />

      <Route path="/" render={() => <Redirect to={"/home"} />} />
    </Switch>
  );
};