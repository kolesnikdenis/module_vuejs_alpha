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
                $out['msg1']="";
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
	if ($task=='get_list_number_from_book'){
        $q=$job['parent_id'];
        $books_id=$job['phone_book_id'];
        $sql="SELECT * FROM `phone_list` WHERE `parent_id_user` = '".$q."' AND `parent_phone_db_id` ='".$books_id."' ";
        $result = mysqli_query($con,$sql);
        $out->request = $sql;
        if ( $result->num_rows >0 ) {
            $out['msg']="";
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            $out['sql'] = json_encode($myArray);
        }else {
            $out['msg']="гладь и пустота :D";
        }
        $out['msg1']=$sql;
	}


	if ($task=='find_in_phone_book'){
        $books_id=$job['phone_book_id'];
        $find=$job['find'];
        $q=$job['parent_id'];
        $sql="SELECT * FROM `phone_list` WHERE `parent_id_user` = '".$q."' AND `parent_phone_db_id` ='".$books_id."'  and  ( name like '%".$find."%' or phone like '%".$find."%' ) ";
        $result = mysqli_query($con,$sql);
        $out->request = $sql;
        if ( $result->num_rows >0 ) {
            $out['msg']="";
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            $out['sql'] = json_encode($myArray);
        }else {
            $out['msg']="не смог найти...";
        }
        $out['msg1']=$sql;
	}


    if ($task=='add_to_phone_book'){
        mysqli_select_db($con,"db_phonebook");
        $q=$job['parent_id'];
        $n=$job['books_id'];
        $n_add=$job['name'];
        $phone_add=$job['num_phone'];
        $sql="SELECT * FROM  `phonebook`.`phone_list`  WHERE `parent_id_user` = '".$q."' AND `parent_phone_db_id` ='".$n."' and `name`= '".$n_add."'";
        $result = mysqli_query($con,$sql);
        $out->request = $sql;
        if ( $result->num_rows >0 ) {
            $out['msg']="Имя контакта уже существует: \"$n_add\" придумай другое имя..";
        }
        else {
            $sql = "INSERT INTO `phonebook`.`phone_list` (`id`, `datetime`, `parent_id_user`, `parent_phone_db_id`, `name`, `phone`, `photo`) VALUES (NULL, NOW(), '".$q."', '".$n."', '".$n_add."', '".$phone_add."', '".$job['base64']."');";
            if ($con->query($sql) === TRUE) {
                $out['msg']="Контакт успешно создан ".$n;
                $out['msg1']="";
            } else {
                $out['msg']="Якась неведома ошибка";
                $out['msg1']="Error: " . $sql . "<br>" . $conn->error;

            }
        }
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

