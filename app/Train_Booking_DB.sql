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