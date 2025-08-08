import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
emailjs.init("UDNHQlX3IkKHBPbK8"); // Replace with your actual EmailJS User ID

export const sendOrderConfirmationEmail = async (orderDetails) => {
    try {
        const { id, items, amount, taxes, shipping, email } = orderDetails;
        
        // Format order items for the email template
        const formattedOrders = items.map(item => ({
            name: item.name,
            units: item.amount,
            price: item.price,
            image: item.image
        }));

        // Prepare template parameters
        const templateParams = {
            order_id: id,
            email: email,
            orders: formattedOrders,
            cost: {
                shipping: shipping || 0,
                tax: taxes || 0,
                total: amount
            }
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            'service_m3asiux',  // Your service ID
            'template_19laftp',  // Your template ID
            templateParams
        );

        console.log('Email sent successfully:', response);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};
