-- MariaDB dump 10.19  Distrib 10.4.18-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: db_ankasa
-- ------------------------------------------------------
-- Server version	10.4.18-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id_country` int(11) NOT NULL AUTO_INCREMENT,
  `town` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  PRIMARY KEY (`id_country`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Surabaya','Indonesia'),(2,'Medan','indonesia'),(3,'Padang','indonesia'),(4,'Tokyo','jepang'),(5,'Bandung','indonesia'),(6,'Jogja','indonesia'),(7,'amsterdam','belanda');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `id_ticket` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(225) NOT NULL,
  `airlane` varchar(50) NOT NULL,
  `from_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `depTime` datetime NOT NULL,
  `arrivedTime` datetime NOT NULL,
  `price` int(50) NOT NULL,
  `class` enum('Economy','Business','FistClass') NOT NULL,
  `transit` enum('Direct','Transit','Transit+2') NOT NULL,
  `wifi` tinyint(1) NOT NULL,
  `meal` tinyint(1) NOT NULL,
  `luggage` tinyint(1) NOT NULL,
  `codeAirplane` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_ticket`),
  KEY `from_id` (`from_id`),
  KEY `destination_id` (`destination_id`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`from_id`) REFERENCES `country` (`id_country`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `country` (`id_country`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'https://i.postimg.cc/L5BK1D3v/garuda-indonesia-logo-BD82882-F07-seeklogo-1.png','Garuda Indonesia',2,4,'2000-09-01 12:33:09','2000-09-01 15:21:09',214,'Economy','Transit',0,0,0,'GIA'),(2,'https://i.postimg.cc/Fs3g0qch/AIR-ASIA-1-1.png','Airasia',1,2,'2000-09-01 12:33:09','2000-09-01 15:21:09',215,'Economy','Transit',1,0,0,'AXM'),(3,'https://i.postimg.cc/FRw3LgHf/Lion-Air-logo-logotype-1.png','LionAir',2,4,'2000-09-01 12:33:09','2000-09-01 15:21:09',300,'Economy','Transit',1,0,0,'LNI'),(4,'https://i.postimg.cc/L5BK1D3v/garuda-indonesia-logo-BD82882-F07-seeklogo-1.png','Garuda Indonesia',4,1,'2000-09-01 15:33:09','2000-11-01 17:12:09',314,'Business','Transit',0,0,0,'GIA'),(5,'https://i.postimg.cc/Fs3g0qch/AIR-ASIA-1-1.png','Airasia',1,7,'2000-09-01 16:33:09','2000-11-01 18:12:09',256,'Business','Direct',0,0,0,'AXM'),(6,'https://i.postimg.cc/FRw3LgHf/Lion-Air-logo-logotype-1.png','LionAir',2,4,'2000-09-01 17:33:09','2000-11-01 19:12:09',500,'Business','Direct',0,0,0,'LNI');
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `id_transaction` int(11) NOT NULL AUTO_INCREMENT,
  `contactPerson` int(11) NOT NULL,
  `gender` enum('Mr','Ms') NOT NULL,
  `name` varchar(100) NOT NULL,
  `country_id` int(11) NOT NULL,
  `insurance` tinyint(1) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `total` int(50) NOT NULL,
  `payment` enum('Eticket Issued','Waiting Payment') NOT NULL,
  `orderDate` datetime NOT NULL,
  PRIMARY KEY (`id_transaction`),
  KEY `ticket_id` (`ticket_id`),
  KEY `country_id` (`country_id`),
  KEY `contactPerson` (`contactPerson`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`id_ticket`),
  CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`id_country`),
  CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`contactPerson`) REFERENCES `users` (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,6,'Mr','Mike Kowalski',1,0,1,30000,'Waiting Payment','2000-09-12 05:00:00'),(3,1,'Mr','budidoremi1234',2,0,2,2000,'Waiting Payment','0000-00-00 00:00:00'),(4,1,'Mr','lalala',2,0,2,2000,'Waiting Payment','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `address` varchar(225) DEFAULT NULL,
  `photoProfile` text DEFAULT NULL,
  `creditCard` varchar(45) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','$2b$10$hAUwm4n68t9Q3zP112jKcuRl6VVMLouendAgzKjzV4v/vXlSMpB2.',NULL,NULL,NULL,NULL,0),(6,'Make Kowalski','flightbooking@ankasa.com','$2b$10$F8pzS69MUNurAofdsuP4Ke3nGwAF67zThgo31qyxkoQu23B.BJHLO',2147483647,'medan,indonesia','https://i.postimg.cc/CMGc3Fdz/nnzk-ZNYWHa-U.png','4441 1235 5512 5551',1);
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

-- Dump completed on 2021-08-30 21:09:19
