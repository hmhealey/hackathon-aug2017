// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import Poll from './components/poll';

class PluginClass {
    initialize(registerComponents, store) {
        registerComponents({
            'PostMessageView.poll': Poll
        });
    }
}

global.window.plugins['asdf'] = new PluginClass();
