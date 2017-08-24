#!/user/bin/env/python

import flask
import json
import requests

from flask import request

mattermost_url = ''
create_poll_token = ''
fake_jira_token = ''
action_post_token = ''

auth_token = ''

app = flask.Flask(__name__)

@app.route('/create_poll', methods=['POST'])
def create_poll():
	if request.form['token'] != command_token:
		flask.abort(403)

	data = request.form['text']
	lines = [line for line in data.split('\n') if line != '']

	r = requests.post('http://www.strawpoll.me/api/v2/polls', data=json.dumps({
		'title': lines[0],
		'options': lines[1:],
		'multi': False
	}))

	print('received %d status code from strawpoll: %s' % (r.status_code, r.text))

	if r.status_code != 200:
		flask.abort(500)

	response = r.json()
	mm_response = requests.post(
		'%s/api/v4/posts' % mattermost_url,
		data=json.dumps({
			'message': 'http://www.strawpoll.me/embed_1/%d' % response['id'],
			'channel_id': request.form['channel_id'],
			'type': 'poll',
			'props': {
				'poll_id': response['id']
			}
		}),
		headers={
			'Authorization': 'bearer %s' % auth_token
		}
	)

	return ''

ticket = """h1. Go do something

h2. Summary

That something should involve *bold text* and _some emphasis_. It should be ^up high^ and ~down low~. It -should- +shouldn't+ contain company secrets.

h2. Implementation details

We want it to link to [our company home page|http://about.mattermost.com]. It should include the following code somewhere:

{noformat}
public static void main(String[] args) {
	System.out.println("Hello, world!");
}
{noformat}

h2. List of required colours

# Red
# Blue
# Green
# Purple"""

@app.route('/fake_jira', methods=['POST'])
def fake_jira():
	if request.form['token'] != fake_jira_token:
		flask.abort(403)

	mm_response = requests.post(
		'%s/api/v4/posts' % ,
		data=json.dumps({
			'message': ticket,
			'channel_id': request.form['channel_id'],
			'type': 'jira',
			'props': {
				'ticket_name': 'Do a thing',
				'ticket_number': 1234,
				'ticket_link': 'https://mattermost.atlassian.net/browse/PLT-1234'
			}
		}),
		headers={
			'Authorization': 'bearer %s' % auth_token
		}
	)

	return ''


@app.route('/action_post', methods=['POST'])
def action_post():
	if request.form['token'] != action_post_token:
		flask.abort(403)

	mm_response = requests.post(
		'%s/api/v4/posts' % mattermost_url,
		data=json.dumps({
			'message': 'This post does stuff if you have the right plugins',
			'channel_id': request.form['channel_id'],
			'type': 'action_post',
			'props': {
			}
		}),
		headers={
			'Authorization': 'bearer %s' % auth_token
		}
	)

	return ''
