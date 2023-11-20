import React, { useState } from 'react'
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Sidebar } from 'primereact/sidebar';

function MainLayout() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div className="h-screen w-full">
                <div className="w-full h-full p-2">
                    <h1 className="text-center">MainLayout</h1>
                    <Button label="Submit" />


                    <Card title="Title">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                        </p>
                    </Card>

                    <Panel header="Header" className="mt-5">
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </Panel>
                </div>


                <div className="card flex justify-content-center">
                    <Sidebar visible={visible} onHide={() => setVisible(false)}>
                        <h2>Sidebar</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </Sidebar>
                    <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
                </div>


            </div>
        </>
    )
}

export default MainLayout