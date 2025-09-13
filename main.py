from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Sample data for projects
projects = [
    {"id": 1, "name": "Project Alpha", "status": "active", "sites": 4, "efficiency": 88},
    {"id": 2, "name": "Project Beta", "status": "operational", "sites": 3, "efficiency": 75},
    {"id": 3, "name": "Project Gamma", "status": "reporting", "sites": 5, "efficiency": 85},
    {"id": 4, "name": "Project Delta", "status": "inactive", "sites": 2, "efficiency": 60},
    {"id": 5, "name": "Project Epsilon", "status": "active", "sites": 6, "efficiency": 90},
]

# Sample recent activity
recent_activity = [
    {"type": "new_site", "project": "Project Alpha", "description": "Site D added in San Francisco", "time": "2 hours ago"},
    {"type": "status_update", "project": "Project Beta", "description": "Site B now operational after maintenance", "time": "5 hours ago"},
    {"type": "report_generated", "project": "Project Gamma", "description": "Quarterly performance metrics generated", "time": "1 day ago"},
]

@app.route('/api/projects', methods=['GET'])
def get_projects():
    return jsonify(projects)

@app.route('/api/recent-activity', methods=['GET'])
def get_recent_activity():
    return jsonify(recent_activity)

if __name__ == '__main__':
    app.run(debug=True)