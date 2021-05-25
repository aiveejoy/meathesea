import PDFTemplate from 'pdfmake'
import global from 'src/helpers/global.js'

export default {
  dataContainer: [],
  dataContainerDel: [],
  imageLogo: [],
  priceAdd: [],
  priceAddDel: [],
  getItem(data) {
    let sub = []
    this.cutlery = data.add_cutlery
    this.address = data.shipping_address.address1 !== null ? data.shipping_address.address1 : data.shipping_address.address1
    this.contact_number = data.shipping_address.phone_number
    this.date = new Date(data.created_on_utc).toLocaleDateString().replaceAll('-', '/')
    this.name = data.customer.first_name !== null ? data.customer.first_name : 'No Name'
    this.order_number = data.id
    this.total = data.order_total
    this.currency = global.currency[0].text
    this.purpose = data.order_status
    this.deliveryDate = new Date(data.created_on_utc).toLocaleDateString().replaceAll('-', '/')
    this.time = new Date(data.created_on_utc).toLocaleTimeString()
    this.deliveryTime = data.order_accept_start_time + '-' + data.order_accept_end_time
    // data.order_items.forEach(element => {
    //   if(element.product.category_type === 0){
    //     if(this.priceAdd.length > 0){
    //       let c = this.priceAdd.reduce(function (a, b) {
    //         return a + b
    //       })
    //       sub.push((element.product.price + parseInt(c)) * element.quantity)
    //     }
    //   }else if(element.product.category_type === 1){
    //     if(this.priceAddDel.length > 0){
    //       let d = this.priceAddDel.reduce(function (a, b) {
    //         return a + b
    //       })
    //       sub.push((element.product.price + parseInt(d)) * element.quantity)
    //     }
    //   }
    // })
    // this.subTotal = sub.reduce(function (a, b) {
    //   return a + b
    // })
  },
  getImage(image) {
    this.imageLogo = image
  },
  getData(retrieve) {
    this.dataContainer = retrieve
  },
  getDel(retrieveDel) {
    this.dataContainerDel = retrieveDel
  },
  template() {
    var retrieve = []
    var retrieveDel = []
    retrieve.push(
      [
        {
          text: 'Item',
          margin: [0, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Qty',
          margin: [70, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Amount',
          decoration: 'underline',
          bold: true,
          border: [false, false, false, false],
          margin: [0, 0, 20, 0],
          fontSize: 10,
          alignment: 'right'
        }
      ]
    )
    retrieveDel.push(
      [
        {
          text: 'Item',
          margin: [0, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Qty',
          margin: [70, 0, 0, 0],
          fontSize: 10,
          bold: true,
          decoration: 'underline',
          border: [false, false, false, false]
        },
        {
          text: 'Amount',
          decoration: 'underline',
          bold: true,
          border: [false, false, false, false],
          margin: [0, 0, 20, 0],
          fontSize: 10,
          alignment: 'right'
        }
      ]
      )
    let a = []
    let c = []
    this.dataContainer.length > 0 &&
    this.dataContainer.map((key, index) => {
      key.addOn.map(el => {
        a.push(el.name)
        c.push(el.price_adjustment)
        this.priceAdd.push(el.price_adjustment)
      })
      retrieve.push([
        { text: [{ text: key['product'], fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }, { text: ((key['addOn'].length > 0) ? ('\n+' + (a).join('\n  +')) : ' '), fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }], margin: [0, 0, 0, 0], border: [false, false, false, false] },
        { text: key['quantity'], fontSize: 10, margin: [70, 0, 0, 0], border: [false, false, false, false] },
        { text: [{ text: (this.currency + ' ' + key['price']), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }, { text: ((key['addOn'].length > 0) ? ('\n ' + (c).join('\n')) : ' '), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }], margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }
      ])
    })
    let b = []
    let d = []
    this.dataContainerDel.length > 0 &&
    this.dataContainerDel.map(key => {
      key.addOn.map(el => {
        b.push(el.name)
        d.push(el.price_adjustment)
        this.priceAddDel.push(el.price_adjustment)
      })
      retrieveDel.push([
        { text: [{ text: key['product'], fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }, { text: ((key['addOn'].length > 0) ? ('\n+' + (b.join('\n  +'))) : ' '), fontSize: 10, margin: [0, 0, 0, 0], border: [false, false, false, false] }], margin: [0, 0, 0, 0], border: [false, false, false, false] },
        { text: key['quantity'], fontSize: 10, margin: [70, 0, 0, 0], border: [false, false, false, false] },
        { text: [{ text: (this.currency + ' ' + key['price']), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }, { text: ((key['addOn'].length > 0) ? ('\n ' + (d).join('\n')) : ' '), fontSize: 10, margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }], margin: [0, 0, 20, 0], border: [false, false, false, false], alignment: 'right' }
      ])
    })
    var docDefinition = {
      pageMargins: [20, 20, 20, 20],
      pageSize: {
        width: 300,
        height: 'auto'
      },
      content: [
        {
          image: this.imageLogo,
          fit: [100, 100],
          alignment: 'center'
          // margin: [ 5, 5, 5, 5 ]
        },
        {
          text: 'Meat The Sea',
          fontSize: 15,
          style: 'subheader',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  text: '#' + this.order_number,
                  border: [false, false, false, true]
                },
                {
                  text: ' ',
                  margin: [0, 0, 84, 0],
                  border: [false, false, false, true]
                },
                {
                  text: this.date,
                  border: [false, false, false, true]
                },
                {
                  text: this.time,
                  border: [false, false, false, true],
                  alignment: 'right'
                }
              ]
            ]
          }
        },
        {
          text: [ { text: 'Cust. Name: ' }, { text: this.name, bold: true } ],
          fontSize: 10,
          style: 'subheader',
          alignment: 'left',
          margin: [0, 7]
        },
        {
          text: [ { text: 'Customer #: ' }, { text: this.contact_number, bold: true } ],
          fontSize: 10,
          style: 'subheader',
          alignment: 'left'
        },
        {
          text: [ { text: 'Address: ' }, { text: this.address, bold: true } ],
          fontSize: 10,
          style: 'subheader',
          alignment: 'left',
          margin: [0, 7]
        },
        {
          text: [ {text: 'Order for: '}, { text: this.purpose, bold: true } ],
          fontSize: 11,
          alignment: 'center'
        },
        {
          text: 'Delivery Time:\n\n',
          fontSize: 11,
          alignment: 'center',
          margin: [0, 7, 0, 0]
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              table: {
                body: [
                  [{
                    text: '',
                    border: [false, false, false, false]
                  },
                  {
                    text: this.deliveryDate + '\n' + this.deliveryTime,
                    alignment: 'center',
                    bold: true
                  },
                  {
                    text: '',
                    border: [false, false, false, false]
                  }]
                ]
              }
            },
            { width: '*', text: '' }
          ]
        },
        this.dataContainer.length > 0
        ? {
          text: '________________________________________________'
        }
        : {
        },
        this.dataContainer.length > 0
        ? {
          text: 'RESTAURANT ITEMS',
          fontSize: 10,
          style: 'header',
          alignment: 'left',
          bold: true,
          margin: [0, 7, 0, 0],
          border: [false, true, false, false]
        }
        : {
        },
        this.dataContainer.length > 0
        ? {
          style: 'tableExample',
          table: {
            headerRows: 1,
            border: [false, false, false, false],
            widths: ['*', '*', '*'],
            body: retrieve
          }
        }
        : {
        },
        this.dataContainerDel.length > 0
        ? {
          text: '________________________________________________'
        }
        : {

        },
        this.dataContainerDel.length > 0
        ? {
          text: 'DELI-SHOP ITEMS',
          fontSize: 10,
          style: 'header',
          alignment: 'left',
          bold: true,
          margin: [0, 7, 0, 0],
          border: [false, true, false, false]
        }
        : {

        },
        this.dataContainerDel.length > 0
        ? {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: retrieveDel
          }
        }
        : {

        },
        {
          text: '________________________________________________'
        },
        this.cutlery === true
        ? {
          text: [ { text: 'Note:', italics: true }, { text: 'ADD CUTLERY' } ],
          alignment: 'left',
          fontSize: 10,
          margin: [0, 5, 0, -5],
          bold: true
        }
        : {
        },
        this.cutlery === true
        ? {
          text: '________________________________________________'
        }
        : {
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              [
                {
                  text: 'Subtotal',
                  margin: [0, 10, 0, 0],
                  fontSize: 11,
                  border: [false, false, false, false]
                },
                {
                  text: this.currency + ' ' + this.subTotal + '\n',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 10, 0, 0],
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'VAT',
                  fontSize: 11,
                  border: [false, false, false, false]
                },
                {
                  text: '-----',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'Total',
                  fontSize: 11,
                  bold: true,
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                },
                {
                  text: this.currency + ' ' + this.total + '\n',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                }
              ]
            ]
          }
        }
      ]
    }
    PDFTemplate.createPdf(docDefinition).open()
  }
}
