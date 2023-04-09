import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useForm } from "react-hook-form";
import "./bill.css";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function BillingApp() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [shopkeeperName, setShopkeeperName] = useState("");
  const [shopkeeperAddress, setShopkeeperAddress] = useState("");
  const [shopkeeperEmail, setShopkeeperEmail] = useState("");
  const [shopkeeperContact, setShopkeeperContact] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  // **************************************
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // *********************************
  const addItem = () => {
    const newItem = {
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
    };
    setItems([...items, newItem]);
    setItemName("");
    setItemPrice(0);
    setItemQuantity(0);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [image_1, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function removeHtmlTags(text) {
    // Regular expression to match HTML tags
    const htmlRegex = /<.*?>/g;
    // Replace all HTML tags with an empty string
    return text.replace(htmlRegex, "");
  }
  function generatePDF() {
    // const downloadPDFContent = document.getElementById("downloadPDF").innerHTML;
    // const companyContent = document.getElementById("company").innerHTML;
    const companyNameContent = document.getElementById("companyName").innerHTML;
    const companyDetailsContent1 =
      document.getElementById("companyDetails1").innerHTML;
    const companyDetailsContent2 =
      document.getElementById("companyDetails2").innerHTML;
    const companyDetailsContent3 =
      document.getElementById("companyDetails3").innerHTML;
    const invoiceClassContent =
      document.getElementById("invoiceClass").innerHTML;
    const billtoDetailsContent1 =
      document.getElementById("billtoDetails1").innerHTML;
    const billtoDetailsContent2 =
      document.getElementById("billtoDetails2").innerHTML;
    const billtoDetailsContent3 =
      document.getElementById("billtoDetails3").innerHTML;
    const billToContent = document.getElementById("billTo").innerHTML;
    // const billToDetailsContent = document.getElementById("bill-to-details").innerHTML;
    // const table1Content = document.getElementById("table-1").innerHTML;
    // const table0Content = document.getElementById("table-0").innerHTML;
    const subtotalContent = document.getElementById("subTotal").innerHTML;
    // const thbSubtotalValueContent = document.getElementById("th-b-subtotal-value").innerHTML;
    // const thbCgstContent = document.getElementById("th-b-cgst").innerHTML;
    // const thbCgstValueContent = document.getElementById("th-b-cgst-value").innerHTML;
    // const thbSgstContent = document.getElementById("th-b-sgst").innerHTML;
    // const thbSgstValueContent = document.getElementById("th-b-sgst-value").innerHTML;
    const totalTaxContent = document.getElementById("totalTax").innerHTML;
    // const thbTotalTaxValueContent = document.getElementById("th-b-total-tax-value").innerHTML;
    const totalBillContent = document.getElementById("totalBill").innerHTML;
    // const thbTotalValueContent = document.getElementById("th-b-total-value").innerHTML;

    console.log(companyNameContent);

    const itemsTable = {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*", "*"],
        body: [
          [
            { text: "Name", style: "tableHeader" },
            { text: "Price", style: "tableHeader" },
            { text: "Quantity", style: "tableHeader" },
            { text: "Total", style: "tableHeader" },
            { text: "", style: "tableHeader" },
          ],
          ...items.map((item) => [
            { text: item.name },
            { text: `₹${item.price.toFixed(2)}` },
            { text: item.quantity },
            { text: `₹${(item.price * item.quantity).toFixed(2)}` },
            { text: "" },
          ]),
        ],
      },
      layout: "lightHorizontalLines",
      style: "tableStyle",
    };

    const documentDefinition = {
      content: [
        {
          text: removeHtmlTags(invoiceClassContent),
          style: "detailsTagStyle2",
          alignment: "right",
        },
        {
          text: removeHtmlTags(invoiceDate),
          style: "detailsTagStyle2",
          alignment: "right",
        },
        {
          text: companyNameContent,
          style: "nameTagStyle",
        },
        {
          text: removeHtmlTags(companyDetailsContent1),
          style: "detailsTagStyle",
        },
        {
          text: removeHtmlTags(companyDetailsContent3),
          style: "detailsTagStyle",
        },
        {
          text: removeHtmlTags(companyDetailsContent2),
          style: "detailsTagStyle",
        },
        {
          text: billToContent,
          style: "nameTagStyle",
          margin: [0, 20, 0, 0],
        },
        {
          text: removeHtmlTags(billtoDetailsContent1),
          style: "detailsTagStyle",
        },
        {
          text: removeHtmlTags(billtoDetailsContent3),
          style: "detailsTagStyle",
        },
        {
          text: removeHtmlTags(billtoDetailsContent2),
          style: "detailsTagStyle",
          lineHeight: 2,
        },
        {
          text: "Items",
          style: "nameTagStyle",
          alignment: "center",
          lineHeight: 2,
        },
        itemsTable,
        {
          text: "Sub-total: " + subtotalContent,
          styel: "detailsTagStyle",
          alignment: "right",
          margin: [0, 0, 70, 0],
        },
        {
          text: "CGST: 2.5%",
          styel: "detailsTagStyle",
          alignment: "right",
          margin: [0, 0, 70, 0],
        },
        {
          text: "SGST: 2.5%",
          styel: "detailsTagStyle",
          alignment: "right",
          margin: [0, 0, 70, 0],
        },
        {
          text: "Total Tax: " + totalTaxContent,
          styel: "detailsTagStyle",
          alignment: "right",
          margin: [0, 0, 70, 0],
        },
        {
          text: "Total: " + totalBillContent,
          styel: "nameTagStyle",
          alignment: "right",
          margin: [0, 0, 70, 0],
          bold: true,
        },
        {
          image: image_1,
          fit: [200, 200],
          width: 150,
          height: 150,
        },
        {
          text: "Terms and Conditions: ",
          fontSize: 11,
          margin: [20, 20, 20, 0],
        },
        {
          text: "Payment Terms: All invoices are payable within 30 days from the date of issue. Late payment will attract interest at the rate of 2% per month or the maximum allowable by law, whichever is lower.",
          fontSize: 10,
          margin: [20, 0, 20, 20],
        },
        {
          text: "Created utilizing the most up-to-date Swipe Billing Application.",
          fontSize: 8,
          color: "blue",
          margin: [20, 10, 20, 0],
        },
      ],
      pageMargins: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50,
        _maxWidth: 500,
        _minWidth: 300,
      },
      styles: {
        nameTagStyle: {
          margin: 0,
          textTransform: "capitalize",
          fontSize: 14,
          bold: true,
          width: 200,
        },
        detailsTagStyle: {
          margin: 0,
          textTransform: "capitalize",
          fontSize: 12,
          width: 100,
        },
        detailsTagStyle2: {
          margin: 0,
          textTransform: "capitalize",
          fontSize: 11,
          width: 100,
        },
        tableStyle: {
          margin: [0, 5, 0, 15],
          alignment: "center",
        },
      },
    };
    console.log("documentDefinition:", documentDefinition);
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download();
  }

  return (
    <>
      <div className="root-bill">
        <div className="head-tag">
          <h1 className="swipe">
            <span style={{ color: "#f00" }}>S</span>
            <span style={{ color: "#ff0" }}>w</span>
            <span style={{ color: "#0f0" }}>i</span>
            <span style={{ color: "#00f" }}>p</span>
            <span style={{ color: "#f0f" }}>e</span>
          </h1>
          <p className="tagline">A must have Billing App</p>
        </div>
        {/* <hr className="hr-line" /> */}
        {/* <h3 className="heading-app">Start with Our Billing App</h3> */}

        <form onSubmit={handleSubmit(onSubmit)} className="form-ui">
          <div className="row1">
            <div className="cus">
              <h5 className="big-label">Customers details</h5>

              <label htmlFor="customer-name">Customer Name:</label>
              <input
                {...register("customerName", { required: true })}
                placeholder="Enter the customer name"
                type="text"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.customerName && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
              <label htmlFor="customer-address">Customer Address:</label>
              <input
                {...register("customerAddress", { required: true })}
                placeholder="Enter the field"
                type="text"
                id="customer-address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
              {errors.customerAddress && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
              <label htmlFor="customer-contact">Customer Contact:</label>
              <input
                {...register("customerContact", { required: true })}
                placeholder="Enter the field"
                type="text"
                id="customer-contact"
                value={customerContact}
                onChange={(e) => setCustomerContact(e.target.value)}
              />
              {errors.customerContact && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
              <label htmlFor="customer-email">Customer Email:</label>
              <input
                {...register("customerEmail", { required: true })}
                placeholder="Enter the field"
                type="text"
                id="customer-email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div className="shop">
              <h5 className="big-label">Shopkeepers details</h5>

              <label htmlFor="shopkeeper-name">Shopkeeper Name:</label>
              <input
                {...register("shopkeeperName", { required: true })}
                placeholder="Enter the field"
                type="text"
                id="shopkeeper-name"
                value={shopkeeperName}
                onChange={(e) => setShopkeeperName(e.target.value)}
              />
              {errors.shopkeeperName && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
              <label htmlFor="shopkeeper-address">Shopkeeper Address:</label>
              <input
                {...register("shopkeeperAddress", { required: true })}
                placeholder="Enter the field"
                type="text"
                id="shopkeeper-address"
                value={shopkeeperAddress}
                onChange={(e) => setShopkeeperAddress(e.target.value)}
              />
              {errors.shopkeeperAddress && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
              <label htmlFor="shopkeeper-contact">Shopkeeper contact:</label>
              <input
                {...register("shopkeeperContact", { required: true })}
                placeholder="Enter the field"
                type="text"
                id="shopkeeper-contact"
                value={shopkeeperContact}
                onChange={(e) => setShopkeeperContact(e.target.value)}
              />
              {errors.shopkeeperContact && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
              <label htmlFor="shopkeeper-email">Shopkeeper email:</label>
              <input
                {...register("shopkeeperEmail", { required: true })}
                placeholder="Enter the field"
                type="text"
                id="shopkeeper-email"
                value={shopkeeperEmail}
                onChange={(e) => setShopkeeperEmail(e.target.value)}
              />
              {errors.shopkeeperEmail && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
            </div>
          </div>
          <div>
            <label>Upload Signature</label>
            <input
              {...register("sign", { required: true })}
              type="file"
              onChange={handleImageChange}
            />
          </div>
          {errors.sign && (
            <p style={{ color: "red", fontSize: "10px" }}>
              This field is required
            </p>
          )}
          <h5 className="big-label">Invoice details</h5>
          <div className="row1">
            <div>
              <label htmlFor="date-input">Enter a date:</label>
              <input
                {...register("dateInput", { required: true })}
                type="date"
                id="date-input"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
              {errors.dateInput && (
                <p style={{ color: "red", fontSize: "10px" }}>
                  This field is required
                </p>
              )}
            </div>
            <div>
              <label htmlFor="number-input">Enter a invoice number:</label>
              <input
                {...register("invoiceNumber", { required: true })}
                type="number"
                id="invoice-number-input"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
          </div>
          <h5 className="big-label">Items Details</h5>
          <div className="row1">
            <div>
              <label htmlFor="item-name">Item Name:</label>
              <input
                type="text"
                id="item-name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="item-price">Price:</label>
              <input
                type="number"
                id="item-price"
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="item-quantity">Quantity:</label>
              <input
                type="number"
                id="item-quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(Number(e.target.value))}
              />
            </div>
          </div>
          <button type="button" className="add-item" onClick={addItem}>
            Add Item
          </button>
          <button className="download-btn" onClick={generatePDF}>
            Download PDF
          </button>
        </form>

        <div className="download-pdf" id="downloadPDF">
          <div className="row-div" id="rowDiv">
            <div className="company" id="company">
              <h3 className="company-name" id="companyName">
                Company name: {shopkeeperName}
              </h3>
              <p className="company-details" id="companyDetails1">
                Address: {shopkeeperAddress}{" "}
              </p>
              <p className="company-details" id="companyDetails3">
                {" "}
                Contact: {shopkeeperContact}{" "}
              </p>
              <p className="company-deatils" id="companyDetails2">
                {" "}
                Email: {shopkeeperEmail}
              </p>
            </div>
            <div className="invoice-details" id="invoiceDetails">
              <p className="invoice-class" id="invoiceClass">
                Invoice Date: {invoiceDate}
              </p>
              <p id="invoiceNumber"> Invoice Number: {invoiceNumber}</p>
            </div>
          </div>
          <h3 className="bill-to" id="billTo">
            Bill To {customerName}
          </h3>
          <p className="bill-to-details" id="billtoDetails1">
            Address: {customerAddress}{" "}
          </p>
          <p className="bill-to-details" id="billtoDetails3">
            {" "}
            Contact: {customerContact}{" "}
          </p>
          <p className="bill-to-deatils" id="billtoDetails2">
            {" "}
            Email: {customerEmail}
          </p>
          <h2 id="itemsHeading">Items:</h2>
          <table className="table-1" id="itemsTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button type="button" onClick={() => removeItem(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total" id="total">
            <table className="table-0">
              <tr className="tr-b">
                <th className="th-b">sub-total: </th>
                <th className="th-b" id="subTotal">
                  ₹{calculateTotal().toFixed(2)}
                </th>
              </tr>
              <tr className="tr-b">
                <th className="th-b">CGST: </th>
                <th className="th-b">2.5%</th>
              </tr>
              <tr className="tr-b">
                <th className="th-b">SGST: </th>
                <th className="th-b">2.5%</th>
              </tr>
              <tr className="tr-b">
                <th className="th-b">Total tax:</th>
                <th className="th-b" id="totalTax">
                  {calculateTotal().toFixed(2) * 0.05}{" "}
                </th>
              </tr>
              <tr className="tr-b">
                <th className="th-b">Total: </th>
                <th className="th-b" id="totalBill">
                  {calculateTotal().toFixed(2) * 0.05 +
                    parseFloat(calculateTotal().toFixed(2))}
                </th>
              </tr>
            </table>
          </p>
          {image_1 && <img src={image_1} alt="Uploadedimage" />}
          <p className="terms">
            Terms and Conditions: Lorem ipsum dolor sit amet consectetur
            adipisicing elit.{" "}
          </p>
        </div>
      </div>
      <div className="footer">
        <p className="copyright">Copyright 2023</p>
      </div>
    </>
  );
}

export default BillingApp;
