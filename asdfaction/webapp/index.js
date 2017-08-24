// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import ActionPost from './components/action_post';

class PluginClass {
    initialize(registerComponents, store) {
        registerComponents({
            'PostMessageView.action_post': ActionPost
        });
    }
}

global.window.plugins['asdfaction'] = new PluginClass();
