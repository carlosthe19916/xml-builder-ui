import { connect } from "react-redux";
import ProviderManager from "./ProviderManager";

import { createMapStateToProps } from "../../store/common";
import {
  componentActions,
  componentSelectors
} from "../../store/organizationComponent";
import { serverInfoSelectors, serverInfoActions } from "../../store/serverInfo";
import { withRouter } from "react-router-dom";

const mapStateToProps = createMapStateToProps((state, ownProps: any) => {
  const componentId = ownProps.match.params.componentId;

  return {
    component: componentSelectors.selectComponent(state, componentId),
    componentFetchStatus: componentSelectors.selectComponentFetchStatus(
      state,
      componentId
    ),
    componentError: componentSelectors.selectComponentError(state, componentId),

    serverInfo: serverInfoSelectors.selectServerInfo(state),
    serverInfoFetchStatus: serverInfoSelectors.selectServerInfoFetchStatus(
      state
    ),
    serverInfoError: serverInfoSelectors.selectServerInfoError(state)
  };
});

const mapDispatchToProps = {
  fetchComponent: componentActions.fetchComponent,
  fetchServerInfo: serverInfoActions.fetchServerInfo
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProviderManager)
);
