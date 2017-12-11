<?php
header('Content-Type: application/json');

$task = $_POST['task'];
$job = $_POST['job'];
$out = array('msg' => "error auth",
'msg1' =>'',
'html' => '',
'sql' => '',
'request' => $task );
//echo json_encode($out);


if ($task){
	$con = mysqli_connect('localhost','modulevue','modulevue','phonebook');
	if (!$con) {
	    die('Could not connect: ' . mysqli_error($con));
	}
    if ($task=='login') {
        $l=$job['login'];
        $p=$job['password'];
        $sql="SELECT * FROM user WHERE login = '".$l."' and password='".$p."'";
        $result = mysqli_query($con,$sql);
        $out->request = $sql;
        if ( $result->num_rows > 0 ) {
            $out['msg']="Добро пожаловать!!!";
            $out['msg1']="true";
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            $out['sql'] = json_encode($myArray);
        }else {
            $out['msg']="Вы ввели не верный логин или пароль, или такого пользователя вовсе не существует";
            $out['msg1']="false";
            $out['error']="user not found";
        }
    }
    if ($task=='update_info') {
	    $sql="UPDATE `phonebook`.`user` SET `password` = '".$job['password']."', `firstname`='".$job['name']."', `login`='".$job['login']."', `lastname`='".$job['lastname']."', `photo`='".$job['base64']."' WHERE `user`.`id` = '".$job['id']."'";
        if ($con->query($sql) === TRUE) {
            $out['msg']="даннные успешно обновлены";
            $out['msg1']="даннные успешно обновлены";
        } else {
            $out['msg']="Якась неведома ошибка";
            $out['msg1']="Error: " . $sql . "<br>" . $conn->error;
        }
    }
    if ($task=='get_info_user') {
        $l=$job['login'];
        $p=$job['password'];
        $sql="SELECT * FROM user WHERE login = '".$l."' and password='".$p."'";
        $result = mysqli_query($con,$sql);
        $out->request = $sql;
        if ( $result ) {
            $out['msg']="";
            $out['msg1']="";
            //var_dump($result);
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            $out['sql'] = json_encode($myArray);
        }
    }
	if ($task=='reg') {
		mysqli_select_db($con,"user");
		$q=$job['login'];
		$sql="SELECT * FROM user WHERE login = '".$q."'";
		$result = mysqli_query($con,$sql);
        $out->request = $sql;
		if ( $result->num_rows >0 ) {
            $out['msg']="такой абонент уже существует :'(";
		}
        else {
            $sql = "INSERT INTO `phonebook`.`user` (`id`, `datetime`, `login`, `password`, `firstname`, `lastname`, `photo`, `description`) VALUES  (NULL, NOW(), '".$job['login']."', '".$job['password']."', '".$job['name']."', '".$job['lastname']."', '".$job['base64']."', '');";
            if ($con->query($sql) === TRUE) {
                $out['msg']="успешно зарегистрировал пользователя";
            } else {
                $out['msg']="Якась неведома ошибка";
                $out['msg1']="Error: " . $sql . "<br>" . $conn->error;
            }
		}
	}

	if ($task=='create_phone_book'){
        mysqli_select_db($con,"db_phonebook");
        $q=$job['parent_id'];
        $n=$job['name_db'];
        $sql="SELECT * FROM db_phonebook WHERE user_id_parent= '".$q."' and `name`= '".$n."'";
        $result = mysqli_query($con,$sql);
        $out->request = $sql;
        if ( $result->num_rows >0 ) {
            $out['msg']="имя такой записной книги у этого пользователя уже существует";
        }
        else {
            $sql = "INSERT INTO `phonebook`.`db_phonebook` (`id`, `datetime`, `user_id_parent`, `name`, `description`, `photo`) VALUES (NULL, NOW(), '".$job['parent_id']."', '".$n."', '".$job['desc']."', '".$job['base64']."');";
            if ($con->query($sql) === TRUE) {
                $out['msg']="телефонная книга успешно создана ".$n;
                $out['msg1']="телефонная книга успешно создана ".$n;
            } else {
                $out['msg']="Якась неведома ошибка";
                $out['msg1']="Error: " . $sql . "<br>" . $conn->error;

            }
        }
	}

    if ($task=='get_list_phone_book'){
        $q=$job['parent_id'];
        $sql="SELECT * FROM `db_phonebook` WHERE `user_id_parent` = '".$q."'";
        $result = mysqli_query($con,$sql);
        $out->request = $sql;
        if ( $result->num_rows >0 ) {
            $out['msg']="";
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            $out['sql'] = json_encode($myArray);
        }
    }
	if ($task=='del_phonebook'){
	
	}

	if ($task=='add_to_phonebook'){
	}

	if ($task=='del_from_phonebook'){

	}

	if ($task=='del_user'){

	}
	//

	if ($task=='find_from_phone_book'){

	}
    echo json_encode($out);
}

