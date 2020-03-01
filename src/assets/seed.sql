CREATE TABLE IF NOT EXISTS Hotels(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,img TEXT);
INSERT or IGNORE INTO Hotels VALUES (1, 'hotel1','https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT or IGNORE INTO Hotels VALUES (2, 'hotel2','https://pbs.twimg.com/profile_images/953978653624455170/j91_AYfd_400x400.jpg');
INSERT or IGNORE INTO Hotels VALUES (3, 'hotel3','https://pbs.twimg.com/profile_images/1060037170688417792/vZ7iAWXV_400x400.jpg');
 
CREATE TABLE IF NOT EXISTS userdata(id INTEGER  AUTOINCREMENT,email TEXT PRIMARY KEY, data TEXT);
-- INSERT or IGNORE INTO UserData(id, email, data) VALUES (1, 'Ionic Academy', 1);
