<?php
/**
 * @version     1.0.0
 * @package     com_register
 * @copyright   Copyright (C) 2011. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @author      Created by com_combuilder - http://www.notwebdesign.com
 */

// No direct access.
defined('_JEXEC') or die;

require_once(JPATH_ROOT.DS.'components'.DS.'com_register'.DS.'factory.php');
				
JTable::addIncludePath( JPATH_ROOT .DS.'components'.DS.'com_account' . DS . 'tables' );

jimport('joomla.utilities.xconfig');
$jxConfig		= new JXConfig();
if (!$jxConfig->allowUsersRegister())
{
	$mainframe	= JFactory::getApplication();
	$mainframe->redirect(JURI::base(), JText::_('COM_REGISTER_MSG_NOT_ALLOW_REGISTRATION'), 'error');
}

class RegisterControllerSignup extends JController
{
	
	public function display() 
	{		
		// Only admin can use this function to invite guests
		$mainframe	= JFactory::getApplication();
		$my			= JXFactory::getUser();
				
		if ($_POST)
		{
			// Check for request forgeries.
			JRequest::checkToken() or jexit(JText::_('JINVALID_TOKEN'));
			
			$jxConfig		= new JXConfig();
			
			$name			= JRequest::getVar('name', '');
			$email			= JRequest::getVar('email', '');
			$username		= JRequest::getVar('username', '');
			$password1		= JRequest::getString('password', '');
			$password2		= JRequest::getString('confirm_password', '');
			
			$data			= array('name' => $name,
									'username' => $username,
									'password' => $password1,
									'conf_pass' => $password2,
									'email'		=> $email);

			$model = RegisterFactory::getModel('registration');
			if ($model->registerUser($data))
			{
				$mainframe->redirect(JURI::base(), JText::_('COM_REGISTER_MSG_REGISTRATION_SUCCESSFUL'));
			}
			else
			{
				$mainframe->enqueueMessage($model->getError(), 'error');
			}
		}
		
		JRequest::setVar('view', 'register');
		parent::display();
	}
	
	public function register()
	{	
	}	
		
}