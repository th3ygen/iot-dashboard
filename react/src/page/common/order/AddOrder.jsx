import styles from 'styles/common/order/Add.module.scss';

import { FaUndo,FaReply,FaEraser,FaCheckSquare } from 'react-icons/fa';

// components
import Table from "components/Table.component";

function AddOrder() {

    const itemList = {
		header: ["Item", "Sub Price"],
		items: [
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Test", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
			["1234","Item 1", "Item 2"],
		],
		colWidthPercent: ["20%", "20%", "20%", "20%"],
		isBadge: [false, false, false, false],
		badgeColor: [
			["", "", "#71e071", ""],
			["", "", "#ff7171", ""],
		],
		centered: [false, true, true, true],

		actions: [
			{
				icon: "FaReply",
				callback: (n) => {
					console.log('editing', n);
				},
			},
		]
	};

    return (
        <div className={styles.content}>
            <div className={styles.order}>
                <div className={styles.fTitle}> Order Form</div>
                <div className={styles.orderForm}>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="vendor">Vendor </label>
                        <select className={styles.formSelect} id="vendor" name="vendor">
                            <option>K2 SDN BHD</option>
                            <option>RO SDN BHD</option>
                            <option>LA INDUSTRY</option>
                        </select>
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="remarks">Remarks </label>
                        <textarea className={styles.remarks} id="remarks"></textarea>
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="itemName">Item Name </label>
                        <input className={styles.formInput} type="text"/>
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="unitPrice">Unit Price </label>
                        <input className={styles.formInput} type="number" />
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="quantity">Quantity </label>
                        <input className={styles.formInput} type="number" />
                    </div>
                    <div className={styles.itemButton}>
                        <div className={styles.button}><FaReply/> Update List </div>
                        
                    </div>
                </div>
            </div>

            <div className={styles.itemList}>
				<div className={styles.itemTable}>
					<Table title="Item List" data={itemList} />
				</div>
                <div className={styles.summary}>
                    <div className={styles.sumTitle}>Summary</div>
                    <div className={styles.sumContent}>
                        <div className={styles.contSum}>
                            <label className={styles.formLabel} for="grandTotal">Grand Total: </label>
                            <label className={styles.formLabel} for="gTotal">RM 0.00 </label>
                        </div>
                        <div className={styles.contSum}>
                            <label className={styles.formLabel} for="vendorSummary">Vendor: </label>
                            <p className={styles.formLabel} for="vendorS">K2 SDN BHD </p>
                        </div>
                        <div className={styles.butOrder}>
                            <div className={styles.button}><FaEraser/> Reset</div>
                            <div className={styles.button}><FaCheckSquare/>Submit for Approval</div>
                            <input type="hidden" name="status" id="status" value="Submit for Approval"></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddOrder;