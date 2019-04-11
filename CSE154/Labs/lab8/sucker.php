<!DOCTYPE html>
<html>
    <head>
        <title>Buy Your Way to a Better Education!</title>
        <link href="https://www.cs.washington.edu/education/courses/cse154/14sp/labs/4/buyagrade.css" type="text/css" rel="stylesheet" />
    </head>

    <body>
        <h1>Thanks, sucker!</h1>

        <p>Your information has been recorded.</p>

        <div>
            <strong>Name</strong>
            <?= $_POST["name"]?>
        </div>

        <div>
            <strong>Section</strong>
            <?= $_POST["section"]?>
        </div>

        <div>
            <strong>Credit Card Type</strong>
            <?= $_POST["creditcard"]?>
        </div>

        <div>
            <strong>Credit Card Number</strong>
            <?= $_POST["ccnumber"]?>
        </div>
    </body>
</html>  