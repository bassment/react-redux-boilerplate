import 'url-search-params-polyfill';
import 'fetch-polyfill';
import 'babel-polyfill';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ExampleContainer, NotFoundRoute } from 'components';

import { sprite } from 'lib';

import 'styles/reset.styl';
import 'styles/base.styl';

export class App extends Component {
    componentWillMount() {
        sprite.elem = sprite.render(document.body);
    }

    componentWillUnmount() {
        sprite.elem.parentNode.removeChild(sprite.elem);
    }

    render() {
        return (
            <Switch>
                <Route
                    path='/'
                    component={ExampleContainer}
                />
                <Route component={NotFoundRoute} />
            </Switch>
        );
    }
}
