import PageHeader from "components/PageHeader.component";
import Table from "components/Table.component";

import styles from "styles/user/filter/Filters.module.scss";

function FiltersPage() {
    return (
        <div className={styles.container}>
            <PageHeader
                title="Filters"
                brief="Manage your filters"
                navs={[
                    {
                        name: "Add filter",
                        path: "/user/filters/add",
                        icon: "FaPlus",
                    },
                ]}
            />
            <div className={styles.content}>
                <Table
                    title="Manage filters"
                    headers={["Filter", "Data count", "Last update"]}
                    colWidthPercent={["30%", "10%", "10%"]}
                ></Table>
            </div>
        </div>
    );
}

export default FiltersPage;