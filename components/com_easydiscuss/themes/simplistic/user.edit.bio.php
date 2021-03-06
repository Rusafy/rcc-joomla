<?php
/**
 * @package		EasyDiscuss
 * @copyright	Copyright (C) 2010 Stack Ideas Private Limited. All rights reserved.
 * @license		GNU/GPL, see LICENSE.php
 *
 * EasyDiscuss is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 * See COPYRIGHT.php for copyright notices and details.
 */

defined('_JEXEC') or die('Restricted access');
?>
<script type="text/javascript">
EasyDiscuss.require()
	.library('markitup')
	.done(function($){
		$( '#signature' ).markItUp({set: "bbcode_easydiscuss"});
});
</script>
<div class="tab-item user-bio">

	<div class="control-group">
		<div class="input-label pb-10"><?php echo JText::_('COM_EASYDISCUSS_PROFILE_FULLNAME'); ?></div>
		<div class="input-wrap"><input type="text" value="<?php echo $this->escape( $user->name ); ?>" name="fullname" class="input width-350"></div>
	</div>
	<div class="control-group">
		<div class="input-label pb-10"><?php echo JText::_('COM_EASYDISCUSS_PROFILE_NICKNAME'); ?></div>
		<div class="input-wrap mrm"><input type="text" value="<?php echo $this->escape( $profile->nickname ); ?>" name="nickname" class="input width-250"></div>
	</div>
	<div class="control-group">
		<div class="input-label pb-10"><?php echo JText::_('COM_EASYDISCUSS_PROFILE_DESCRIPTION'); ?></div>
		<div class="input-wrap"><textarea name="description" class="input half-width" rows="5"><?php echo $profile->description; ?></textarea></div>
	</div>
	<div class="control-group">
		<div class="input-label pb-10"><?php echo JText::_('COM_EASYDISCUSS_PROFILE_SIGNATURE'); ?> <span><?php echo JText::_('COM_EASYDISCUSS_PROFILE_SIGNATURE_INFO'); ?></span></div>
		<div class="input-wrap">
			<textarea name="signature" id="signature" class="full-width"><?php echo $profile->getSignature( true ); ?></textarea>
		</div>
	</div>

</div>
