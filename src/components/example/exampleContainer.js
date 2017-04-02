import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { exampleActions } from 'actions';
import { Example } from './example';
import { get } from 'lodash';

function mapStateToProps(state) {
    const message = get(state, 'main.example.message');
    return { message };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(exampleActions, dispatch);
}

export const ExampleContainer = connect(mapStateToProps, mapDispatchToProps)(Example);
