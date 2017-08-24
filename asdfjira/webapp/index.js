// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import Jira from './components/jira';

class PluginClass {
    initialize(registerComponents, store) {
        registerComponents({
            'PostMessageView.jira': Jira
        });
    }
}

global.window.plugins['asdfjira'] = new PluginClass();
