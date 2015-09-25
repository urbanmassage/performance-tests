# Performance Tests

A few tests used to determine and compare the performance of a few technologies we might use.

## Results

### http
#### 10
```
Done 1000 in 1.544 seconds with concurrency=10
---------------------
Min: 0
Max: 105
Avg: 15.179
```
#### 50
```
Done 1000 in 1.787 seconds with concurrency=50
---------------------
Min: 0
Max: 174
Avg: 88.04
```

### express
#### 10
```
Done 1000 in 1.623 seconds with concurrency=10
---------------------
Min: 0
Max: 72
Avg: 16.124
```
#### 50
```
Done 1000 in 1.63 seconds with concurrency=50
---------------------
Min: 0
Max: 194
Avg: 80.192
```

### rabbitr
#### 10
```
Done 1000 in 10.1 seconds with concurrency=10
---------------------
Min: 0
Max: 201
Avg: 100.61
```
#### 50
```
Done 1000 in 10.632 seconds with concurrency=50
---------------------
Min: 0
Max: 629
Avg: 524.089
```

### amqplib
#### 10
```
Done 1000 in 3.659 seconds with concurrency=10
---------------------
Min: 17
Max: 119
Avg: 36.49
```
#### 50
```
Done 1000 in 3.614 seconds with concurrency=50
---------------------
Min: 47
Max: 382
Avg: 179.391
```
