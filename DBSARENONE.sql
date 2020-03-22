CREATE DATABASE  IF NOT EXISTS `dbsarenone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dbsarenone`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: dbsarenone
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `sizeId` int(11) NOT NULL,
  `priceId` int(11) NOT NULL,
  `stockId` int(11) DEFAULT NULL,
  `jumlahstock` int(20) DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (6,28,1,1,1,1,100,1,35000);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `imagecategory` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'SAUSAGE','images/Sausage.png'),(2,'NUGGET','images/Nugget.png'),(3,'MEATBALL','images/Meatball.png'),(4,'FRENCH FRIES','images/FrenchFries.png'),(5,'SMOKE BEEF','images/SmokeBeef.png');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailtransaction`
--

DROP TABLE IF EXISTS `detailtransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailtransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `imagePath` varchar(100) NOT NULL,
  `productname` varchar(45) NOT NULL,
  `size` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `stockId` int(11) DEFAULT NULL,
  `totalprice` int(11) NOT NULL,
  `datetransaction` date DEFAULT NULL,
  `timescart` varchar(45) DEFAULT NULL,
  `transactionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailtransaction`
--

LOCK TABLES `detailtransaction` WRITE;
/*!40000 ALTER TABLE `detailtransaction` DISABLE KEYS */;
INSERT INTO `detailtransaction` VALUES (1,'hilmi','/images/IMG1584578466076.png','Bratwurst',800,70000,10,6,700000,'2020-03-21','23:7:5',1),(2,'hilmi','/images/IMG1584490188394.png','Chicken Nugget',500,35000,10,2,350000,'2020-03-21','23:7:5',1),(3,'al','/images/IMG1584667733540.png','Meatball',1000,80000,20,19,1600000,'2020-03-21','23:11:54',1),(4,'al','/images/IMG1584490188394.png','Chicken Nugget',500,35000,10,2,350000,'2020-03-21','23:12:39',3),(5,'carrel','/images/IMG1584667733540.png','Meatball',500,35000,10,3,350000,'2020-03-21','23:20:56',1),(6,'chris','/images/IMG1584578466076.png','Bratwurst',800,70000,1,6,70000,'2020-03-22','13:48:58',1),(7,'chris','/images/IMG1584578466076.png','Bratwurst',800,70000,1,6,70000,'2020-03-22','13:48:58',1),(8,'chris','/images/IMG1584578466076.png','Bratwurst',500,35000,1,1,35000,'2020-03-22','15:6:45',6);
/*!40000 ALTER TABLE `detailtransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'Pria'),(2,'Wanita');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `getallproduct_complete`
--

DROP TABLE IF EXISTS `getallproduct_complete`;
/*!50001 DROP VIEW IF EXISTS `getallproduct_complete`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `getallproduct_complete` AS SELECT 
 1 AS `id`,
 1 AS `productname`,
 1 AS `productcategoryId`,
 1 AS `idcategory`,
 1 AS `category`,
 1 AS `imagePath`,
 1 AS `description`,
 1 AS `idsize`,
 1 AS `size`,
 1 AS `idprice`,
 1 AS `price`,
 1 AS `jumlahstock`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'Pelajar/Mahasiswa'),(2,'Ibu rumah tangga'),(3,'Swasta'),(4,'Wiraswasta'),(5,'PNS');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodetransaksi`
--

DROP TABLE IF EXISTS `metodetransaksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodetransaksi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `metodetransaksi` varchar(100) NOT NULL,
  `nomorRekening` varchar(100) NOT NULL,
  `imagePath` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodetransaksi`
--

LOCK TABLES `metodetransaksi` WRITE;
/*!40000 ALTER TABLE `metodetransaksi` DISABLE KEYS */;
INSERT INTO `metodetransaksi` VALUES (1,'BCA','BCA-XXXX-XXXX','/images/bca.png'),(2,'MANDIRI','MANDIRI-XXXX-XXXX','/images/mandiri.png'),(3,'BNI','BNI-XXXX-XXXX','/images/bni.png'),(4,'BRI','BRI-XXXX-XXXX','/images/bri.png');
/*!40000 ALTER TABLE `metodetransaksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
INSERT INTO `price` VALUES (1,35000),(2,70000),(3,80000),(4,110000);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productname` varchar(45) NOT NULL,
  `imagePath` varchar(45) DEFAULT '/images/IMG1584488847192.jpeg',
  `productcategoryId` int(11) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bratwurst','/images/IMG1584578466076.png',1,'Tiga pilihan sosis Bratwurst di dalam satu kemasan: Euro Griller, Chicken Bratwurst Coarse dan Cheese Bratwurst. Dibuat dengan daging premium yang dimasak dengan metode pengeringan dan pemasakan dengan uap. Tanpa menggunakan MSG dan bahan pewarna.'),(2,'Chicken Nugget','/images/IMG1584490188394.png',2,'Merupakan inovasi Nugget Ayam yang dilapisi “Extra Crispy Bubble Crumb” berbentuk bubble setelah digoreng akan memberikan sensasi ekstra renyah yang belum pernah ada sebelumnya.'),(3,'Meatball','/images/IMG1584667733540.png',3,'Bakso matang dengan cincangan daging premium yang halus, disertai rasa khas daun marjoram. Dibuat dengan metode pengasapan, pengeringan dan pemasakan dengan uap. Tanpa menggunakan tambahan MSG atau bahan perwarna.'),(4,'French Fries','/images/IMG1584489812293.png',4,'Kentang matang dengan cincangan daging premium dan bumbu yang lebih halus, serta rasa smoky yang lebih terasa. Dibuat dengan metode pengasapan, pengeringan dan pemasakan dengan uap. Tanpa menggunakan MSG dan bahan pewarna.'),(5,'SMOKE BEEF','/images/IMG1584489882199.jpg',5,'COMING SOON!'),(6,'Chicken Gewurz','/images/IMG1584489297249.png',1,'Tiga pilihan sosis Bratwurst di dalam satu kemasan: Euro Griller, Chicken Bratwurst Coarse dan Cheese Bratwurst. Dibuat dengan daging premium yang dimasak dengan metode pengeringan dan pemasakan dengan uap. Tanpa menggunakan MSG dan bahan pewarna.'),(7,'Beef Cocktail','/images/IMG1584489431883.png',1,'Tiga pilihan sosis Bratwurst di dalam satu kemasan: Euro Griller, Chicken Bratwurst Coarse dan Cheese Bratwurst. Dibuat dengan daging premium yang dimasak dengan metode pengeringan dan pemasakan dengan uap. Tanpa menggunakan MSG dan bahan pewarna.'),(8,'Chicken Cocktail','/images/IMG1584489476151.png',1,'Tiga pilihan sosis Bratwurst di dalam satu kemasan: Euro Griller, Chicken Bratwurst Coarse dan Cheese Bratwurst. Dibuat dengan daging premium yang dimasak dengan metode pengeringan dan pemasakan dengan uap. Tanpa menggunakan MSG dan bahan pewarna.'),(9,'Frankfurter','/images/IMG1584489512215.png',1,'Sosis matang dengan cincangan daging premium dan bumbu yang halus, disertai kandungan bawang putih yang lebih terasa. Dibuat dengan metode pengasapan, pengeringan dan pemasakan dengan uap. Tanpa menggunakan MSG dan bahan pewarna.');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,500),(2,800),(3,1000),(4,2500);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `sizeId` int(11) NOT NULL,
  `priceId` int(11) NOT NULL,
  `jumlahstock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,1,1,1,99),(2,2,1,1,50),(3,3,1,1,80),(4,4,4,3,100),(6,1,2,2,69),(9,6,3,3,100),(10,7,3,2,100),(11,8,3,2,100),(12,9,2,2,100),(13,7,1,1,100),(15,8,1,1,100),(17,3,2,2,100),(19,3,3,3,40);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `totaltransaction` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT 'ON PROCESS',
  `datetransaction` date NOT NULL,
  `timescart` varchar(45) DEFAULT NULL,
  `metodetransaksiId` int(11) DEFAULT NULL,
  `imagePath` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,2,1050000,'PAID','2020-03-21','23:7:5',1,'/images/IMG1584806825866.png'),(2,3,1600000,'ON PROCESS','2020-03-21','23:11:54',2,'/images/IMG1584807114665.png'),(3,3,350000,'PAID','2020-03-21','23:12:39',4,'/images/IMG1584807159666.png'),(4,4,350000,'PAID','2020-03-21','23:20:56',3,'/images/IMG1584807656134.png'),(5,82,140000,'PAID','2020-03-22','13:48:58',1,'/images/IMG1584859738160.png'),(6,82,35000,'ON PROCESS','2020-03-22','15:6:45',3,'/images/IMG1584864405549.png');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `verified` varchar(45) NOT NULL DEFAULT 'unverified',
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(20) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `genderId` int(11) DEFAULT NULL,
  `jobId` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `imagePath` varchar(100) DEFAULT '/images/AKUNIMAGE.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','ec0a9d98ae666634d407d4d21b69642f82ef719a928132d034b0c0d5fbf8ab19','hilmi.arizal36@gmail.com','admin','verified',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/IMG1584336785767.JPG WHERE id = 2'),(2,'hilmi','66832863cdb47e7d0cbb347b7b99cdf6569561c33094238144435bac5c26ad24','hilmi.arizal36@gmail.com','user','verified','hilmi','arizal','08817758956','22',1,1,'Jl. Caringin Gg. Lumbung 3 RT.02/RW.03, Bandung, Jawa Barat','/images/IMG1584343797050.jpeg'),(3,'al','5bb38ff60bd61f35a3b1debdf61071fe969fd506f28a6e044f4720bbf7bef4f4','hilmi.arizal36@gmail.com','user','verified','al','ghifary','08817758956','22',1,1,'Jl. Lamongan','/images/IMG1584810737637.jpeg'),(4,'carrel','5bb38ff60bd61f35a3b1debdf61071fe969fd506f28a6e044f4720bbf7bef4f4','hilmi.arizal36@gmail.com','user','verified','Carrel','Hartono','087','22',1,1,'Jl. PIK','/images/IMG1584810646700.jpeg'),(28,'ibnu','5bb38ff60bd61f35a3b1debdf61071fe969fd506f28a6e044f4720bbf7bef4f4','hilmi.arizal36@gmail.com','user','verified',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'/images/AKUNIMAGE.png'),(82,'chris','bbf85ae7de83f00cf665ea3f896b22baee9da024a9971b9721f56957aae53a25','hilmi.arizal36@gmail.com','user','verified','chris','topher','08817758956',NULL,NULL,NULL,'Jl. Karawaci','/images/AKUNIMAGE.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dbsarenone'
--

--
-- Final view structure for view `getallproduct_complete`
--

/*!50001 DROP VIEW IF EXISTS `getallproduct_complete`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `getallproduct_complete` AS select `p`.`id` AS `id`,`p`.`productname` AS `productname`,`p`.`productcategoryId` AS `productcategoryId`,`c`.`id` AS `idcategory`,`c`.`category` AS `category`,`p`.`imagePath` AS `imagePath`,`p`.`description` AS `description`,`s`.`id` AS `idsize`,`s`.`size` AS `size`,`pr`.`id` AS `idprice`,`pr`.`price` AS `price`,`st`.`jumlahstock` AS `jumlahstock` from ((((`products` `p` left join `categories` `c` on((`p`.`productcategoryId` = `c`.`id`))) left join `stock` `st` on((`p`.`id` = `st`.`productId`))) left join `size` `s` on((`s`.`id` = `st`.`sizeId`))) left join `price` `pr` on((`pr`.`id` = `st`.`priceId`))) order by `c`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-22 17:01:06
