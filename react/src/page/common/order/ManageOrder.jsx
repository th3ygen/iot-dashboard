import styles from 'styles/common/order/ManageOrder.module.scss';

import { FaTrashAlt,FaEdit,FaPlus,FaCheckSquare } from 'react-icons/fa';

// components
import Table from "components/Table.component";

function ManageOrder() {

    const orderData = {
		header: ["Order ID", "Vendor", "Order Status", "Last Updated"],
		items: [
			["1234","Item 1", "Item 2", "Active", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Test", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
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
				icon: "FaEdit",
				callback: (n) => {
					console.log('editing', n);
				},
			},
			{
				icon: "FaTrashAlt",
				callback: (n) => {
					console.log('deleting', n);
				},
			},
		]
	};

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.labeled}>
                    <div className={styles.title}>
                        ORDER
                    </div>
                    <div className={styles.subTitle}>
                        This is the Order Page where all the ordered will displayed here.
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.but}>
                        <FaPlus/>
                        <div className={styles.butName}>
                            New Order
                        </div>
                    </div>

                    <div className={styles.but}>
                        <FaCheckSquare/>
                        <div className={styles.butName}>
                            Verify Order
                        </div>
                    </div>
                </div>

            </div>

            <div className={styles.summary}>
                <div className={styles.sumBox}>
                    <div className={styles.label}>
                        Total Order:
                    </div>
                    <div className={styles.numLabel}>
                        101
                    </div>
                </div>

                <div className={styles.sumBox}>
                    <div className={styles.label}>
                        Today Approve Order:
                    </div>
                    <div className={styles.numLabel}>
                        5
                    </div>
                </div>

                <div className={styles.sumBox}>
                    <div className={styles.label}>
                        Progress Order:
                    </div>
                    <div className={styles.numLabel}>
                        10
                    </div>
                </div>
            </div>

            <div className={styles.orderTable}>
                <Table title="Orders" data={orderData} />
            </div>
        </div>
    )
}

export default ManageOrder;
