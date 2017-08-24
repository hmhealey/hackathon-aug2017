import React from 'react';
import PropTypes from 'prop-types';
import {makeStyleFromTheme} from 'mattermost-redux/utils/theme_utils';

export default class Poll extends React.PureComponent {
    static propTypes = {
        post: PropTypes.object.isRequired
    }

    /* Construct and return the JSX to render here. Make sure that rendering is solely based
        on props and state. */
    render() {
        console.log(this.props.post);

        if (!this.props.post.props.poll_id) {
            return <span>{'No poll ID'}</span>;
        }

        const style = getStyle(this.props.theme);

        return (
            <iframe
                src={`http://www.strawpoll.me/embed_1/${this.props.post.props.poll_id}`}
                style={style.container}
            >
                {'Loading poll...'}
            </iframe>
        );
    }
}

/* Define CSS styles here */
const getStyle = makeStyleFromTheme((theme) => {
    return {
        container: {
            border: 0,
            height: 358,
            width: '100%'
        }
    };
});
