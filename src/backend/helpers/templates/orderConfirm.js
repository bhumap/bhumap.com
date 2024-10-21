const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
        case 'pending': return 'status-pending';
        case 'processing': return 'status-processing';
        case 'shipped': return 'status-shipped';
        case 'delivered': return 'status-delivered';
        default: return '';
    }
};

function GenerateOrderConfirmTemplate(orderData) {
    return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
        <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            color: #333;
            line-height: 1.6;
        }

        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: rgb(210, 103, 72); /* Updated to default color */
            padding: 20px;
            text-align: center;
        }

        .logo {
            max-width: 150px;
            height: auto;
        }

        .email-body {
            padding: 30px;
        }

        h1 {
            color: rgb(210, 103, 72); /* Updated to default color */
            font-size: 28px;
            margin-bottom: 20px;
            text-align: center;
            border-bottom: 2px solid rgba(210, 103, 72, 0.5); /* Lighter version of default color */
            padding-bottom: 10px;
        }

        h2 {
            color: rgb(210, 103, 72); /* Updated to default color */
            font-size: 22px;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 1px solid rgba(210, 103, 72, 0.5); /* Lighter version of default color */
            padding-bottom: 10px;
        }

        h3 {
            color: rgb(168, 82, 58); /* Darker shade of default color */
            font-size: 18px;
            margin-top: 25px;
            margin-bottom: 10px;
        }

        p {
            margin-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            overflow: hidden;
        }

        table td, table th {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }

        table th {
            background-color: rgba(210, 103, 72, 0.1); /* Very light version of default color */
            font-weight: bold;
            text-align: left;
            text-transform: uppercase;
            font-size: 14px;
            color: rgb(168, 82, 58); /* Darker shade of default color */
        }

        .items-table {
            margin-top: 15px;
        }

        .items-table th {
            background-color: rgba(210, 103, 72, 0.2); /* Light version of default color */
        }

        .order-totals {
            margin-top: 20px;
            background-color: rgba(210, 103, 72, 0.05); /* Very light version of default color */
            padding: 20px;
            border-radius: 5px;
            border: 1px solid rgb(210, 103, 72);
        }

        .order-totals p {
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
        }

        .order-totals .total {
            font-size: 20px;
            color: rgb(210, 103, 72); /* Default color */
            margin-top: 15px;
            font-weight: bold;
            border-top: 2px solid rgb(210, 103, 72);
            padding-top: 10px;
        }

        .email-footer {
            background-color: rgb(210, 103, 72); /* Updated to default color */
            color: #ffffff;
            padding: 25px;
            text-align: center;
            font-size: 14px;
        }

        .email-footer p {
            margin: 5px 0;
        }

        .email-footer a {
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
        }

        .email-footer a:hover {
            text-decoration: underline;
        }

        .suborder {
            background-color: rgba(210, 103, 72, 0.05); /* Very light version of default color */
            border: 1px solid rgb(210, 103, 72);
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .vendor-info {
            background-color: rgba(210, 103, 72, 0.1); /* Light version of default color */
            border-left: 4px solid rgb(210, 103, 72);
            padding: 15px;
            margin-bottom: 20px;
        }

        .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-pending {
            background-color: #fef3c7;
            color: #d97706;
        }

        .status-processing {
            background-color: #d1fae5;
            color: #059669;
        }

        .status-shipped {
            background-color: rgba(210, 103, 72, 0.2); /* Light version of default color */
            color: rgb(168, 82, 58); /* Darker shade of default color */
        }

        .status-delivered {
            background-color: #d1fae5;
            color: #059669;
        }

        @media only screen and (max-width: 600px) {
            body {
                padding: 10px;
            }

            .email-container {
                width: 100%;
            }

            .email-body {
                padding: 20px;
            }

            h1 {
                font-size: 24px;
            }

            h2 {
                font-size: 20px;
            }

            h3 {
                font-size: 18px;
            }

            table td, table th {
                padding: 8px;
            }
        }
        </style>
    </head>
    <body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://res.cloudinary.com/dl9313s3z/image/upload/t_bhumap/fullLogo_n1h8m7.jpg" height="60" alt="Bhumap" class="logo" />
        </div>
        <div class="email-body">
            <h1>New Order Notification</h1>
            <p>A new order has been placed. Here are the details:</p>
    
            <div class="order-summary">
                <h2>Order Summary</h2>
                <table>
                    <tr>
                        <td><strong>Order ID:</strong></td>
                        <td>${orderData.orderId}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Mode:</strong></td>
                        <td>${orderData.paymentMode}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Status:</strong></td>
                        <td>${orderData.payment_status}</td>
                    </tr>
                    <tr>
                        <td><strong>UTR Number:</strong></td>
                        <td>${orderData.utr_number}</td>
                    </tr>
                    <tr>
                        <td><strong>Order Date:</strong></td>
                        <td>${new Date(orderData.createdAt).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td><strong>Shipping Address:</strong></td>
                        <td>${orderData.address}</td>
                    </tr>
                </table>
            </div>
    
            <div class="order-details">
                <h2>Order Details</h2>
                ${orderData.subOrders.map((subOrder, index) => `
                    <div class="suborder">
                        <h3>Vendor ${index + 1} Information</h3>
                        <div class="vendor-info">
                            <p><strong>Vendor Name:</strong> ${subOrder.vendor_id.fullName}</p>
                            <p><strong>Vendor Address:</strong> ${subOrder.vendor_id.address}</p>
                            <p><strong>Status:</strong> <span class="status ${getStatusClass(subOrder.status)}">${subOrder.status}</span></p>
                        </div>
    
                        <h3>Items Ordered</h3>
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${subOrder.carts.map(cart => `
                                    <tr>
                                        <td>${cart.product_id.name}</td>
                                        <td>${cart.quantity}</td>
                                        <td>₹${cart.price.toFixed(2)}</td>
                                        <td>₹${(cart.quantity * cart.price).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
    
                        <div class="order-totals">
                            <p><strong>Subtotal:</strong> <span>₹${subOrder.subTotal.toFixed(2)}</span></p>
                            <p><strong>GST:</strong> <span>₹${subOrder.gst.toFixed(2)}</span></p>
                            <p><strong>Shipping:</strong> <span>₹${subOrder.shipping.toFixed(2)}</span></p>
                            <p class="total"><strong>Total:</strong> <span>₹${subOrder.total.toFixed(2)}</span></p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="email-footer">
            <p>Thank you for your order!</p>
            <p>If you have any questions, please contact us at <a href="mailto:bhumaphosting@gmail.com">bhumaphosting@gmail.com</a></p>
            <p>&copy; ${new Date().getFullYear()} Bhumap. All rights reserved.</p>
        </div>
    </div>
    </body>
    </html>
    `;
}

export default GenerateOrderConfirmTemplate;