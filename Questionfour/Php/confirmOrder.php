<?php
$CN = mysqli_connect('localhost', 'root', '');
$Db = mysqli_select_db($CN, 'labassignment');

// Decode JSON from the request body
$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

$productIds = $DecodedData['productIds'];
$name = $DecodedData['name'];
$address = $DecodedData['address'];
$cardNumber = $DecodedData['cardNumber'];
$totalPrice = $DecodedData['totalPrice'];

$stmt = "INSERT INTO orders (ProductId, Name, Address, CardNo, Price) 
         VALUES ('$productIds', '$name', '$address', '$cardNumber', '$totalPrice')";

$R = mysqli_query($CN, $stmt);

if ($R) {
    $Message = "Order placed successfully";
} else {
    $Message = "Error: " . mysqli_error($CN);
}

echo json_encode(['message' => $Message]);
?>
