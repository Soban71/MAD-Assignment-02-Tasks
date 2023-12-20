<?php
$CN = mysqli_connect('localhost', 'root', '');
$Db = mysqli_select_db($CN, 'labassignment');

// Decode JSON from the request body
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$productName = $DecodedData['productName'];
$productDescription = $DecodedData['productDescription'];
$productPrice = $DecodedData['productPrice'];

$stmt = "INSERT INTO product (productName, productDescription, Price) VALUES ('$productName', '$productDescription', '$productPrice')";

$R = mysqli_query($CN, $stmt);

if ($R) {
    $Message = "New record created successfully";
} else {
    $Message = "Error: " . mysqli_error($CN); 
}

echo $Message;
?>
