USE ticket_booking_db;

INSERT INTO trains (train_id, train_no, stations, station_times, seats)
VALUES (
           'train-001',
           '12345',
           '["bangalore", "jaipur", "delhi"]',
           '{"bangalore": "13:50:00", "jaipur": "20:30:00", "delhi": "04:00:00"}',
           '[[0, 0, 0], [0, 1, 0], [0, 0, 0]]'
       );

select *
from users;

ALTER TABLE trains ADD COLUMN version BIGINT DEFAULT 0;

DESCRIBE trains;

INSERT INTO trains (train_id, train_no, seats, station_times, stations, version)
VALUES (
           'train-101',
           '12951',
           '[[0,0,0,0,0],[0,0,0,0,0]]',
           '{"delhi": "08:00", "agra": "10:30", "mumbai": "18:00"}',
           '["delhi", "agra", "mumbai"]',
           0
       );

INSERT INTO trains (train_id, train_no, seats, station_times, stations, version)
VALUES (
           'train-102',
           '12952',
           '[[1,1,1,0,1]]',
           '{"delhi": "09:00", "agra": "11:15"}',
           '["delhi", "agra"]',
           0
       );

ALTER TABLE trains ADD COLUMN price DOUBLE DEFAULT 0;

UPDATE trains SET price = 799.00 WHERE train_id = 'train-101';
UPDATE trains SET price = 549.00 WHERE train_id = 'train-102';

ALTER TABLE tickets ADD COLUMN seat_count INT DEFAULT 1;

CREATE TABLE train_schedules (
                                 schedule_id VARCHAR(255) PRIMARY KEY,
                                 train_id VARCHAR(255),
                                 date_of_travel VARCHAR(255),
                                 seats JSON,
                                 version BIGINT DEFAULT 0,
                                 FOREIGN KEY (train_id) REFERENCES trains(train_id)
);

INSERT INTO train_schedules (schedule_id, train_id, date_of_travel, seats, version)
VALUES ('sched-101-0810', 'train-101', '2026-08-10', '[[0,0,0,0,0],[0,0,0,0,0]]', 0);

CREATE TABLE train_schedules (
                                 schedule_id VARCHAR(255) PRIMARY KEY,
                                 train_id VARCHAR(255),
                                 date_of_travel VARCHAR(255),
                                 seats JSON,
                                 version BIGINT DEFAULT 0,
                                 FOREIGN KEY (train_id) REFERENCES trains(train_id)
);

INSERT INTO train_schedules (schedule_id, train_id, date_of_travel, seats, version)
VALUES ('sched-101-0810', 'train-101', '2026-08-10', '[[0,0,0,0,0],[0,0,0,0,0]]', 0);

INSERT INTO train_schedules (schedule_id, train_id, date_of_travel, seats, version)
VALUES ('sched-102-0810', 'train-102', '2026-08-10', '[[1,1,1,0,1]]', 0);

select * from train_schedules;

ALTER TABLE tickets ADD COLUMN seat_row INT DEFAULT 0;
ALTER TABLE tickets ADD COLUMN seat_start INT DEFAULT 0;
ALTER TABLE tickets ADD COLUMN seat_end INT DEFAULT 0;