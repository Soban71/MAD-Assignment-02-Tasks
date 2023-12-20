<?php
header('Content-Type: application/json');

$CN = mysqli_connect('localhost', 'root', '');
$Db = mysqli_select_db($CN, 'labassignment');

$query = "SELECT * FROM orders";
$result = mysqli_query($CN, $query);

$products = array();

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = array(
        'orderId' => $row['orderId'],
        'ProductId' => $row['ProductId'],
        'Name' => $row['Name'],
        'Address' => $row['Address'],
        'CardNo' => $row['CardNo'],
        'Price' => $row['Price'],
        
    );
}

ob_clean();

echo json_encode($products);
?>