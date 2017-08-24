// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createPost, deletePost, removePost} from 'mattermost-redux/actions/posts';
import {getTeammateNameDisplaySetting} from 'mattermost-redux/selectors/entities/preferences';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';
import {displayUsername} from 'mattermost-redux/utils/user_utils';

import ActionPost from './action_post';

function mapStateToProps(state, ownProps) {
    const currentUser = getCurrentUser(state);
    const currentUserDisplayName = displayUsername(currentUser, getTeammateNameDisplaySetting(state));

    return {
        ...ownProps,
        currentUser,
        currentUserDisplayName
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createPost,
            deletePost,
            removePost
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPost);
