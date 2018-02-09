import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';

import { exampleActions } from '../../actions/example/example';
import { Example } from './example';

function mapStateToProps(state) {
  const message = get(state, 'main.example.message');
  return { message };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(exampleActions, dispatch);
}

export const ExampleContainer = connect(mapStateToProps, mapDispatchToProps)(Example);
