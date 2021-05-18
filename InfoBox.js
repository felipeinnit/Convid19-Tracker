import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox_tittle" color="textSecondary">
                {title}
                </Typography>

                <h2 className="infoBox_cases">
                {cases}
                </h2>

                <Typography lassName="infoBox_total" color="textSecondary">
                {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
