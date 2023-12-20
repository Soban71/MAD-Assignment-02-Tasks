<?php
header('Content-Type: application/json');

$CN = mysqli_connect('localhost', 'root', '');
$Db = mysqli_select_db($CN, 'labassignment');

$query = "SELECT * FROM product";
$result = mysqli_query($CN, $query);

$products = array();

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = array(
        'productid' => $row['productid'],
        'productName' => $row['productName'],
        'productDescription' => $row['productDescription'],
        'Price' => $row['Price'],
    );
}

ob_clean();

echo json_encode($products);
?>
