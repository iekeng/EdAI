import  os
from flask import Flask, request, jsonify
from .models import *
from . import create_app

app = create_app()

@app.get('/api/countries', strict_slashes=False)
def get_countries():
    countries = Country.query.all()
    countries_list = [{'id': country.id, 'name': country.name} for country in countries]
    return jsonify(countries_list), 200

@app.post('/post/country', strict_slashes=False)
def post_country():
    name = request.form.get('name')
    new_country = Country(name)

    db.session.add(new_country)
    db.session.commit()

@app.get('/api/regions', strict_slashes=False)
def get_regions():
    regions = Region.query.all()
    all_regions = [{'id': region.id, 'name': region.name} for region in regions]
    return jsonify(all_regions)

@app.post('/post/region', strict_slashes=False)
def post_region():
    name = request.form.get('name')
    new_region = Region(name)

    db.session.add(new_region)
    db.session.commit()

@app.route('/api/region/<int:id>', strict_slashes=False, methods=['POST', 'GET'])
def get_region(id):
    if request.method == 'POST':
        name = request.json['name']
        new_region = Region(name)

        db.session.add(new_region)
        db.session.commit()

        return jsonify({'id': new_region.id, 'name': new_region.name})
    
    region = Region.query.get(id)

    if region is None:
        return jsonify({'error': 'Region not found.'}), 404
    
    return jsonify({'id': region.id, 'name': region.name}), 200

@app.get('/api/profiles', strict_slashes=False)
def students():
    users = Student.query.all()
    all_users = [{'id': user.id,
      'firstname': user.firstname, 
      'lastname': user.lastname,
       'email': user.email} for user in users]
    
    return jsonify(all_users), 200

@app.post('/api/profile/<int:id>', strict_slashes=False)
def login_student(id):
    firstname = request.json["firstname"]
    lastname = request.json["lastname"]
    email = request.json["email"]
    password = request.json["password"]

    new_user = Student(firstname, lastname, email, password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({new_user.firstname, new_user.lastname, new_user.email}), 200

@app.get('/api/profile/<int:id>', strict_slashes=False)
def student_profile(id):
    student = Student.query.get(id)

    if student is None:
        return jsonify({'error': 'Student not found'}), 404
    
    return jsonify({'firstname': student.firstname, 
                    'lastname': student.lastname, 
                    'email': student.email}), 200

@app.put('/api/profile/edit/<int:id>', strict_slashes=False)
def put_student(id):
    user = Student.query.get(id)

    firstname = request.json["firstname"]
    lastname = request.json["lastname"]
    email = request.json["email"]
    password = request.json["password"]
    region_id = request.json["region_id"]

    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    user.password = password
    user.region_id = region_id


@app.get('/api/curriculums', strict_slashes=False)
def get_curriculums():
    curriculums = Curriculum.query.all()
    curriculum_list = [{'id': curriculum.id, 'name': curriculum.name} for curriculum in curriculums]
    return jsonify(curriculum_list)

@app.get('/api/curriculum/<int:id>', strict_slashes=False)
def get_curriculum(id):
    curriculum = Curriculum.query.get(id)
    return jsonify({'id': curriculum.id, 'curriculum': curriculum.name})

@app.get('/api/curriculum/<int:id>/subjects', strict_slashes=False)
def get_subjects(id):
    subjects = Subject.query.filter_by(curriculum_id=id).all()
    if subjects is None:
        return jsonify({'error': 'Subjects not found'}), 404
    all_subjects = [{'id': subject.id, 'name': subject.name} for subject in subjects]
    return jsonify(all_subjects), 202

@app.get('/api/curriculum/<int:id>/subject/<int:num>', strict_slashes=False)
def get_subject(id, num):
    curriculum = Curriculum.query.get(id)
    subjects = curriculum.subjects
    num = num - 1
    if subjects[num] is None:
        return jsonify({'error': 'Subject not found'}), 404
    return jsonify({'id': subjects[num].id, 'name': subjects[num].name}), 200

@app.get('/api/curriculum/<int:id>/subject/<int:num>/topics', strict_slashes=False)
def get_topics(id, num):
    curriculum = Curriculum.query.get(id)
    subject = Subject.query.get(num)
    
    if subject.curriculum_id != curriculum.id:
        return jsonify({
            'error': 'Subject not specified'
        }), 404
    
    topics = Topic.query.filter_by(subject_id=num).all()
    topic_list = [{'id': topic.id, 'topic': topic.name, 'content': topic.content} for topic in topics]
    return jsonify(topic_list), 200

if __name__ == '__main__':
    app.run()