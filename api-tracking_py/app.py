from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Chetan123@#@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define your SQLAlchemy model
class ApiHit(db.Model):
    __tablename__ = 'api_hits'

    id = db.Column(db.Integer, primary_key=True)
    # Define your other columns here...

# Example API route
@app.route('/api', methods=['POST'])
def handle_api():
    # Example of logging API hit
    new_hit = ApiHit(request_type='POST', endpoint='/api', user_agent=request.headers.get('User-Agent'))
    db.session.add(new_hit)
    db.session.commit()
    return 'API hit logged successfully'

if __name__ == '__main__':
    app.run(debug=True)
