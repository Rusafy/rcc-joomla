<?php
/**
 * @version     1.0.0
 * @package     com_administrator
 * @copyright   Copyright (C) 2011. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @author      Created by com_combuilder - http://www.notwebdesign.com
 */
 
// No direct access
defined('_JEXEC') or die;


class AnalyticsAccess
{
	/**
	 * Check user access
	 * 
	 * @action string should be in a form of 'objectName.actionName'
	 * @asset mixed	typical an object which is needed to resolve permission	 	 	 
	 */	 	
	static public function check($userid, $action, $asset)
	{
		$permission = true;
		return $permission;
	}
}