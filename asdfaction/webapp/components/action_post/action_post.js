import React from 'react';
import PropTypes from 'prop-types';

export default class You extends React.PureComponent {
    static propTypes = {
        post: PropTypes.object.isRequired,
        currentUser: PropTypes.object.isRequired,
        currentUserDisplayName: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            createPost: PropTypes.func.isRequired,
            deletePost: PropTypes.func.isRequired,
            removePost: PropTypes.func.isRequired
        })
    };

    copyMe = () => {
        this.props.actions.createPost({
            channel_id: this.props.post.channel_id,
            message: this.props.post.message,
            user_id: this.props.currentUser.id,
            type: this.props.post.type,
            props: {...this.props.post.props},
        });
    }

    deleteMe = async () => {
        await this.props.actions.deletePost(this.props.post);
        this.props.actions.removePost(this.props.post);
    }

    render() {
        const actions = [
            <button
                key='copy'
                style={{
                    backgroundColor: 'green',
                    height: 40,
                    marginLeft: 10,
                    width: 100
                }}
                onClick={this.copyMe}
            >
                {'Copy me'}
            </button>
        ];

        if (this.props.post.user_id === this.props.currentUser.id) {
            actions.push(
                <button
                    key='delete'
                    style={{
                        backgroundColor: 'red',
                        height: 40,
                        marginLeft: 10,
                        width: 100
                    }}
                    onClick={this.deleteMe}
                >
                    {'Delete me'}
                </button>
            );
        }

        return (
            <div>
                <p>{this.props.post.message}</p>
                <div>
                    {`Things ${this.props.currentUserDisplayName} can do to this post:`}
                    {actions}
                </div>
            </div>
        );
    }
}
