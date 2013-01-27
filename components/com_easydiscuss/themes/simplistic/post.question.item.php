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
<a name="<?php echo JText::_('COM_EASYDISCUSS_TOP_ANCHOR');?>"></a>
<div class="discuss-item discussQuestion mt-10<?php echo $post->islock ? ' is-locked' : '';?><?php echo $post->isresolve ? ' is-resolved' : '';?><?php echo $post->isFeatured() ? ' is-featured' : '';?>" data-id="<?php echo $post->id;?>">
	<div class="discuss-status">
		<i data-original-title="<?php echo JText::_( 'COM_EASYDISCUSS_FEATURED_DESC' );?>" data-placement="top" rel="ed-tooltip" class="icon-ed-featured"></i>
		<i class="icon-ed-resolved pull-left" rel="ed-tooltip" data-placement="top" data-original-title="<?php echo JText::_( 'COM_EASYDISCUSS_RESOLVED' , true );?>"></i>

	</div>

	<!-- Discussion title -->
	<div class="discuss-item-hd">
		<h2 class="discuss-post-title">
			<i data-original-title="<?php echo JText::_( 'COM_EASYDISCUSS_LOCKED_DESC' );?>" data-placement="top" rel="ed-tooltip" class="icon-ed-locked"></i>
			<a href="<?php echo DiscussRouter::getPostRoute( $post->id );?>" class="break-word"><?php echo $post->title; ?></a>
		</h2>

		<div class="row-fluid">
			<div class="pull-left small">
				<i class="icon-inbox"></i>
				<?php echo JText::_( 'COM_EASYDISCUSS_POSTED_IN' );?> <a href="<?php echo DiscussRouter::getCategoryRoute( $category->id );?>"><?php echo $category->getTitle();?></a>
			</div>

			<div class="discuss-action-options-1 fs-11 pull-right">
				<div class="discuss-clock ml-10">
					<i class="icon-ed-time"></i> <?php echo $this->formatDate( $system->config->get('layout_dateformat', '%A, %B %d %Y, %I:%M %p') , $post->created);?>
				</div>
			</div>
		</div>
	</div>

	<!-- Discussion left side bar -->
	<div class="discuss-item-left discuss-user discuss-user-role-<?php echo $post->getOwner()->roleid; ?>">

		<a class="" href="<?php echo $post->getOwner()->link;?>">
			<?php if ($system->config->get( 'layout_avatar' ) && $system->config->get( 'layout_avatar_in_post' )) { ?>
				<div class="discuss-avatar avatar-medium <?php echo $post->getOwner()->rolelabel; ?>">
					<img src="<?php echo $post->getOwner()->avatar;?>" alt="<?php echo $this->escape( $post->getOwner()->name );?>" />
					<div class="discuss-role-title"><?php echo $this->escape($post->getOwner()->role); ?></div>
				</div>
			<?php } ?>
			<div class="discuss-user-name mv-5">
				<?php echo $post->getOwner()->name; ?>
			</div>
		</a>

		<?php echo $this->loadTemplate( 'ranks.php' , array( 'userId' => $post->getOwner()->id ) ); ?>

		<?php echo $this->loadTemplate( 'post.conversation.php' , array( 'userId' => $post->getOwner()->id ) ); ?>
	</div>

	<!-- Discussion content area -->
	<div class="discuss-item-right">
		<div class="discuss-story">
			<div class="discuss-story-hd">
				<?php echo $this->loadTemplate( 'post.actions.php' , array( 'access' => $access , 'post' => $post ) ); ?>
			</div>

			<div class="discuss-story-bd">
				<div class="ph-10">

					<?php if( !$post->isProtected() || DiscussHelper::isModerator( $post->category_id ) ){ ?>
						<div class="discuss-content">
							<?php if( $system->config->get( 'main_allowquestionvote' ) ){ ?>
								<?php echo $this->loadTemplate( 'post.vote.php' , array( 'access' => $access , 'post' => $post ) ); ?>
							<?php } ?>

							<div class="discuss-content-item">
								<?php echo $post->content; ?>
							</div>

							<!-- polls -->
							<?php echo $this->getFieldHTML( true , $post ); ?>



							<?php echo $this->loadTemplate( 'post.customfields.php' ); ?>

							<?php echo $this->loadTemplate( 'post.tags.php' , array( 'tags' => $tags ) ); ?>
						</div>

						<div class="discuss-users-action row-fluid mb-10">
							<?php echo $this->loadTemplate( 'post.likes.php' , array( 'post' => $post ) ); ?>
						</div>

						<div class="discuss-users-action row-fluid">
							<?php echo $this->loadTemplate( 'post.comments.php' , array( 'reply' => $post, 'question' => $post  ) ); ?>


						</div>



						<?php echo $this->loadTemplate( 'post.reply.comments.php' , array( 'post' => $post ) ); ?>

						<?php echo $this->loadTemplate( 'post.location.php' , array( 'post' => $post ) ); ?>

						<?php echo DiscussHelper::showSocialButtons( $post, 'horizontal' ); ?>

					<?php } else { ?>
						<?php echo $this->loadTemplate( 'entry.password.php' , array( 'post' => $post ) ); ?>
					<?php } ?>
				</div>

			</div>

			<?php echo $this->loadTemplate( 'post.signature.php' , array( 'signature' => $post->getOwner()->signature ) ); ?>

			<div style="clear: both;"></div>

			<div class="discuss-story-ft">
				<div class="pull-left">
					<?php echo $this->loadTemplate( 'post.favourites.php' , array( 'post' => $post ) ); ?>
				</div>

				<div class="pull-right mt-15 mr-10">
					<?php echo DiscussHelper::getSubscriptionHTML($system->my->id, $post->id, 'post'); ?>
				</div>
			</div>

		</div>
	</div>

</div>
