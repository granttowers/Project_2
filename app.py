import numpy as np
import psycopg2
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import inspect, create_engine, func

from flask import Flask, jsonify, render_template

from DB_keys import db_key

#################################################
# Database Setup
#################################################

# Create the engine to connect to local server
engine = (create_engine(f'postgresql://postgres:' +
          db_key+f'@localhost:5432/Project_2'))

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)
engine.table_names()

# Save references to each table
incident_details = Base.classes.incident_details
injured_person_details = Base.classes.injured_person_details
injury_details = Base.classes.injury_details
company_details = Base.classes.company_details

# #################################################
# # Flask Setup
# #################################################
app = Flask(__name__)


# #################################################
# # Flask Routes
# #################################################

@app.route("/")
def welcome():
    # return render_template("index.html")
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"-------------------------------<br/>"
        f"/api/v1.0/incident_details<br/>"
        f"/api/v1.0/injury_details</br>"
        f"/api/v1.0/company_details"
    )


@app.route("/api/v1.0/incident_details")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all incident details"""

    # Query all incident details
    results = session.query(incident_details.mine_id, incident_details.incident_activity, incident_details.incident_category,
                            incident_details.incident_day, incident_details.incident_month, incident_details.incident_type, incident_details.incident_year).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all incidents
    incident_test = []

    for mine_id, incident_activity, incident_category, incident_day, incident_month, incident_type, incident_year in results:

        incident_test_dict = {}

        incident_test_dict["mine_id"] = mine_id
        incident_test_dict["incident_activity"] = incident_activity
        incident_test_dict["incident_category"] = incident_category
        incident_test_dict["incident_day"] = incident_day
        incident_test_dict["incident_month"] = incident_month
        incident_test_dict["incident_type"] = incident_type
        incident_test_dict["incident_year"] = incident_year

        incident_test.append(incident_test_dict)

    return jsonify(incident_test)


@app.route("/api/v1.0/injury_details")
def names2():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all injury details"""

    # Query all injury details
    results = session.query(injury_details.mine_id, injury_details.injury_body_part, injury_details.injury_nature,
                            injury_details.injury_classification, injury_details.injury_days_lost).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all injuries
    injury_details_test = []

    for mine_id, injury_body_part, injury_nature, injury_classification, injury_days_lost in results:

        injury_details_dict = {}

        injury_details_dict["mine_id"] = mine_id
        injury_details_dict["injury_body_part"] = injury_body_part
        injury_details_dict["injury_nature"] = injury_nature
        injury_details_dict["injury_classification"] = injury_classification
        injury_details_dict["injury_days_lost"] = injury_days_lost

        injury_details_test.append(injury_details_dict)

    return jsonify(injury_details_test)


@app.route("/api/v1.0/company_details")
def names3():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all company details"""

    # Query all company details
    results = session.query(company_details.mine_id, company_details.company_mine_type, company_details.company_name, company_details.company_address,
                            company_details.company_city, company_details.company_injury_count, company_details.company_underground_surface).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all companies
    company_details_test = []

    for mine_id, company_mine_type, company_name, company_address, company_city, company_injury_count, company_underground_surface in results:

        company_details_dict = {}

        company_details_dict["mine_id"] = mine_id
        company_details_dict["company_mine_type"] = company_mine_type
        company_details_dict["company_name"] = company_name
        company_details_dict["company_address"] = company_address
        company_details_dict["company_city"] = company_city
        company_details_dict["company_injury_count"] = company_injury_count
        company_details_dict["company_underground_surface"] = company_underground_surface

        company_details_test.append(company_details_dict)

    return jsonify(company_details_test)


if __name__ == '__main__':
    app.run()
