import React from 'react'
import Button from '@/widgets/Button/Button'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'

const User = () => {
  return (
    <div> <div> <hr className="mt-4"/>
    <div className="mt-4 mb-6 ml-4 mr-4 flex flex-wrap justify-between">
      <div className="flex flex-wrap">
        <Button name={"print"} />
        <Button name={"print"} />
        <Button name={"print"} />
        <Button name={"print"} />
      </div>
      <Button name={"Add Users"} />
    </div>
    
    <div className="mt-6mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-8 p-6"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
          >
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-4 h-[calc(100vh_-_120px)]">
            {/* <ReusableDataGrid
              rows={rows}
              columns={columns}
              rowCount={rowCount}
              isLoading={isLoading}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              slotsdata={CustomPagination}
            /> */}
          </CardBody>
        </Card>
      </div>
    </div></div>
  )
}

export default User