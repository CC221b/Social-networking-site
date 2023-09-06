-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: image_sharing3
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `RequestId` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `PhotoId` int DEFAULT NULL,
  PRIMARY KEY (`RequestId`),
  KEY `UserId` (`UserId`),
  KEY `PhotoId` (`PhotoId`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`),
  CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`PhotoId`) REFERENCES `images` (`ImageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminmessages`
--

DROP TABLE IF EXISTS `adminmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminmessages` (
  `CodeAdminMessage` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL,
  `BodyMessage` varchar(255) DEFAULT NULL,
  `IsDone` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`CodeAdminMessage`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminmessages`
--

LOCK TABLES `adminmessages` WRITE;
/*!40000 ALTER TABLE `adminmessages` DISABLE KEYS */;
INSERT INTO `adminmessages` VALUES (6,136,'Attach a request to delete image from User...136','{\"Path\":\"http://localhost:1234/136/Pepsized_Blur_10.jpg\",\"UserId\":136,\"ImageName\":\"Pepsized_Blur_10.jpg\",\"ImageId\":135}',1),(7,136,'Attach a request to delete image from User...136','{\"Path\":\"http://localhost:1234/136/004_145.JPG\",\"UserId\":136,\"ImageName\":\"004_145.JPG\",\"ImageId\":116}',1),(8,136,'Attach a request to delete image from User...136','{\"Path\":\"http://localhost:1234/136/Pepsized_Blur_38.jpg\",\"UserId\":136,\"ImageName\":\"Pepsized_Blur_38.jpg\",\"ImageId\":141}',0),(9,136,'Attach a request to delete image from User...136','{\"Path\":\"http://localhost:1234/136/Pepsized_Blur_10.jpg\",\"UserId\":136,\"ImageName\":\"Pepsized_Blur_10.jpg\",\"ImageId\":135}',0),(10,136,'Attach a request to delete image from User...136','{\"Path\":\"http://localhost:1234/136/004_145.JPG\",\"UserId\":136,\"ImageName\":\"004_145.JPG\",\"ImageId\":116}',1),(11,136,'Attach a request to delete image from User...136','{\"Path\":\"http://localhost:1234/136/012_208.JPG\",\"UserId\":136,\"ImageName\":\"012_208.JPG\",\"ImageId\":114}',0),(12,136,'Attach a request to delete image from User...136','{\"Path\":\"http://localhost:1234/136/012_208.JPG\",\"UserId\":136,\"ImageName\":\"012_208.JPG\",\"ImageId\":113}',0);
/*!40000 ALTER TABLE `adminmessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blacklist`
--

DROP TABLE IF EXISTS `blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklist` (
  `BlockedUserCode` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BlockedUserCode`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blacklist`
--

LOCK TABLES `blacklist` WRITE;
/*!40000 ALTER TABLE `blacklist` DISABLE KEYS */;
INSERT INTO `blacklist` VALUES (196,'chani'),(197,'miri'),(198,'tzipi'),(199,'chaniben');
/*!40000 ALTER TABLE `blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `UserId` int DEFAULT NULL,
  `FriendId` int DEFAULT NULL,
  KEY `UserId` (`UserId`),
  KEY `FriendId` (`FriendId`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`),
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`FriendId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (134,133),(136,135),(137,135),(138,136),(139,135),(138,144),(138,146),(138,148),(152,136),(138,137),(138,137),(138,148);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `ImageId` int NOT NULL AUTO_INCREMENT,
  `Path` varchar(255) DEFAULT NULL,
  `ImageName` varchar(255) DEFAULT NULL,
  `AlbumId` int DEFAULT NULL,
  `Likes` int DEFAULT '0',
  PRIMARY KEY (`ImageId`),
  KEY `AlbumId` (`AlbumId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`AlbumId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (104,'http://localhost:1234/133/BKGGN048.JPG','BKGGN048.JPG',133,0),(105,'http://localhost:1234/133/ph02559j.jpg','ph02559j.jpg',133,0),(107,'http://localhost:1234/134/SSGP6021.JPG','SSGP6021.JPG',134,0),(110,'http://localhost:1234/135/j0178934.jpg','j0178934.jpg',135,0),(111,'http://localhost:1234/135/j0201651.jpg','j0201651.jpg',135,0),(112,'http://localhost:1234/136/25_207.JPG','25_207.JPG',136,0),(113,'http://localhost:1234/136/012_208.JPG','012_208.JPG',136,0),(114,'http://localhost:1234/136/012_208.JPG','012_208.JPG',136,0),(115,'http://localhost:1234/136/02_241.JPG','02_241.JPG',136,0),(116,'http://localhost:1234/136/004_145.JPG','004_145.JPG',136,0),(117,'http://localhost:1234/137/021_208.JPG','021_208.JPG',137,0),(118,'http://localhost:1234/137/06_241.JPG','06_241.JPG',137,0),(119,'http://localhost:1234/137/13_241.JPG','13_241.JPG',137,0),(120,'http://localhost:1234/137/15_241.JPG','15_241.JPG',137,0),(121,'http://localhost:1234/137/23_207.JPG','23_207.JPG',137,0),(122,'http://localhost:1234/137/22_207.JPG','22_207.JPG',137,0),(123,'http://localhost:1234/137/022_208.JPG','022_208.JPG',137,0),(124,'http://localhost:1234/137/21_241.JPG','21_241.JPG',137,0),(125,'http://localhost:1234/137/25_207.JPG','25_207.JPG',137,0),(126,'http://localhost:1234/137/018_208.JPG','018_208.JPG',137,0),(127,'http://localhost:1234/137/020_208.JPG','020_208.JPG',137,0),(128,'http://localhost:1234/137/39_207.JPG','39_207.JPG',137,0),(131,'http://localhost:1234/138/j0149123.jpg','j0149123.jpg',138,0),(132,'http://localhost:1234/139/j0144276.jpg','j0144276.jpg',139,0),(134,'http://localhost:1234/136/Pepsized_Blur_01.jpg','Pepsized_Blur_01.jpg',136,0),(135,'http://localhost:1234/136/Pepsized_Blur_10.jpg','Pepsized_Blur_10.jpg',136,0),(137,'http://localhost:1234/136/Pepsized_Blur_14.jpg','Pepsized_Blur_14.jpg',136,0),(138,'http://localhost:1234/136/Pepsized_Blur_12.jpg','Pepsized_Blur_12.jpg',136,0),(139,'http://localhost:1234/136/Pepsized_Blur_32.jpg','Pepsized_Blur_32.jpg',136,0),(140,'http://localhost:1234/136/Pepsized_Blur_41.jpg','Pepsized_Blur_41.jpg',136,0),(141,'http://localhost:1234/136/Pepsized_Blur_38.jpg','Pepsized_Blur_38.jpg',136,0),(143,'http://localhost:1234/141/j0405432.jpg','j0405432.jpg',141,0),(144,'http://localhost:1234/141/j0402416.jpg','j0402416.jpg',141,0),(148,'http://localhost:1234/143/Tuba.jpg','Tuba.jpg',143,0),(149,'http://localhost:1234/143/housechime.JPG','housechime.JPG',143,0),(150,'http://localhost:1234/143/MP900382765.JPG','MP900382765.JPG',143,0),(151,'http://localhost:1234/143/j0405432.jpg','j0405432.jpg',143,0),(152,'http://localhost:1234/143/MP900385304.JPG','MP900385304.JPG',143,0),(153,'http://localhost:1234/143/Music047.JPG','Music047.JPG',143,0),(154,'http://localhost:1234/136/TRVVT055.JPG','TRVVT055.JPG',136,0),(155,'http://localhost:1234/136/TRVVT060.JPG','TRVVT060.JPG',136,0),(156,'http://localhost:1234/136/TRVVT079.JPG','TRVVT079.JPG',136,0),(157,'http://localhost:1234/136/TRVVT026.JPG','TRVVT026.JPG',136,0);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `CodeMessage` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL,
  `BodyMessage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CodeMessage`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (2,133,'Message from the admin: the image 10000 תמונות 1642.jpg is Blocked!!',NULL),(4,138,'Message from the admin: the image j0144339.jpg is Blocked!!',NULL),(5,138,'Message from the admin: the image  is Blocked!!',NULL),(6,140,'Message from the admin: the image j0216111.jpg is Blocked!!',NULL),(7,138,'Attach a request to your friends list...144','144'),(8,138,'Attach a request to your friends list...146','146'),(25,134,'Message from the admin: the image BKGGN051.JPG is Blocked!!',NULL),(27,143,'Attach a request to your friends list...152','152'),(28,145,'Attach a request to your friends list...153','153'),(29,143,'Attach a request to your friends list...153','153'),(31,138,'Attach a request to your friends list...137','137'),(32,138,'Attach a request to your friends list...137','137'),(38,138,'136 upload new image....',NULL),(39,152,'136 upload new image....',NULL);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) DEFAULT NULL,
  `NickName` varchar(255) DEFAULT NULL,
  `Password` int DEFAULT NULL,
  `IsPrivate` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (133,'chani','clayman',3626,0),(134,'milca','d',105,0),(135,'miri','a',111,1),(136,'beni','x',1234,0),(137,'EFRAT','C',3,1),(138,'EFRATYALIIN','C',11,1),(139,'v','w',1,0),(140,'tzipi','r',111,0),(141,'chaniben','b',5,1),(142,'b','b',1,0),(143,'shiri','d',22,1),(144,'miraimi','a',1,0),(145,'yehodit','a',22,1),(146,'racheli','l',1,1),(148,'dasi','c',11,1),(149,'baili','d',1,0),(150,'shirle','a',1111,0),(151,'malca','c',33,1),(152,'tzzip','c',8,0),(153,'bllla','b',1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-20 20:30:15
