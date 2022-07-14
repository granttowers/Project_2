CREATE TABLE "incident_details" (
    "incident_details_id" SERIAL PRIMARY KEY,
    "contract_id" TEXT,
    "mine_id" TEXT,
    "incident_day" TEXT,
    "incident_month" TEXT,
    "incident_year" TEXT,
    "incident_activity" TEXT,
    "incident_category" TEXT,
    "incident_description" TEXT,
    "incident_description2" TEXT,
    "incident_state" TEXT,
    "incident_type" TEXT,
    "operator_contractor" TEXT,
    "underground_location" TEXT,
    "underground_method" TEXT
);

cREATE TABLE "injured_person_details" (
    "injury_person_id" SERIAL PRIMARY KEY,
    "mine_id" TEXT,
    "injured_person_age" INT,
    "injured_person_gender" TEXT,
    "injured_person_occupation" TEXT
);

cREATE TABLE "injury_details" (
    "injury_id" SERIAL PRIMARY KEY,
    "mine_id" TEXT,
    "injury_body_part" TEXT,
    "injury_classification" TEXT,
    "injury_count" iNT,
    "injury_days_lost" TEXT,
    "injury_nature" TEXT,
    "injury_source" TEXT,
    "injury_type" TEXT

);

cREATE TABLE "company_details" (
    "mine_id" TEXT,
    "company_name" TEXT,
    "company_address" TEXT,
    "company_city" TEXT,
    "company_injury_count" iNT,
    "company_mine_type" TEXT,
    "company_underground_surface" TEXT,
    "company_zipcode" TEXT,
    CONSTRAiNT "pk_company_details" PRIMARY KEY (
        "mine_id"
     )
);

-- ALTER TABLE "incident_details" Add coNSTRAiNT "fk_incident_details_mine_id" FoREiGN KEy("mine_id")
-- REFERENcES "injury_details" ("mine_id");

-- ALTER TABLE "injury_details" Add coNSTRAiNT "fk_injury_details_mine_id" FoREiGN KEy("mine_id")
-- REFERENcES "injured_Person_details" ("mine_id");

-- ALTER TABLE "company_details" Add coNSTRAiNT "fk_company_details_mine_id" FoREiGN KEy("mine_id")
-- REFERENcES "incident_details" ("mine_id");