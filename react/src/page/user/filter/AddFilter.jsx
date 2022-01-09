import PageHeader from "components/PageHeader.component";

import styles from "styles/user/filter/AddFilter.module.scss";

function AddDevicePage() {
    return (
        <div className="container">
            <PageHeader
                title="Add device"
                brief="Add a new device to your account"
                navs={[
                    {
                        name: "Devices",
                        path: "/user/devices",
                        icon: "FaArrowLeft",
                    },
                ]}
            />
            <div className="content"></div>
        </div>
    );
}

export default AddDevicePage;