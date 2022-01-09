import styles from 'styles/common/order/Order.module.scss';

import { FaEdit,FaReply,FaTrashAlt } from 'react-icons/fa';

// components
import Table from "components/Table.component";

function UpdateOrder() {

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
                <div className={styles.formDetails}>
                    <div className={styles.manager}>
                        <div className={styles.managerTitle}>Manager Details</div>
                        <div className={styles.managerContent}>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="managerLabel">Manager Name: </label>
                                <label className={styles.managerInput} for="managerName">Laila Suriani </label>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="remarksLabel">Remarks: </label>
                                <p className={styles.managerInput} for="remarks">Please change this info </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={styles.formDetails}>
                    <div className={styles.fTitle}> Order Form</div>
                    <div className={styles.orderForm}>
                        <div className={styles.orderInput}>
                            <label className={styles.formLabel} for="vendor">Vendor </label>
                            <select className={styles.formSelect} id="vendor" name="vendor" value="K2 SDN BHD" disabled>
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
                
            </div>

            <div className={styles.itemList}>
				<div className={styles.itemTable}>
					<Table title="Item List" data={itemList} />
				</div>
                <div className={styles.summary}>
                    <div className={styles.sumDetails}>
                        <div className={styles.sumTitle}>Summary</div>
                        <div className={styles.sumContent}>
                            <div className={styles.contSum}>
                                <label className={styles.formLabel} for="grandTotal">Grand Total: </label>
                                <label className={styles.formLabel} for="gTotal">RM 0.00 </label>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.formLabel} for="vendorSummary">Vendor: </label>
                                <p className={styles.formInput} for="vendorS">K2 SDN BHD </p>
                            </div>
                            <div className={styles.butOrder}>
                                <div className={styles.button}><FaEdit/> Update</div>
                                <div className={styles.button}><FaTrashAlt/>Request Delete</div>
                                <input type="hidden" name="status" id="status" value="Submit for Approval"></input>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )

}

export default UpdateOrder;