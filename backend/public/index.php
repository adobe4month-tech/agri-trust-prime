<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use KissanCares\Router;
use KissanCares\Controllers\AuthController;
use KissanCares\Controllers\ProductController;
use KissanCares\Controllers\CartController;
use KissanCares\Controllers\OrderController;
use KissanCares\Controllers\SellerController;
use KissanCares\Controllers\AdminController;
use KissanCares\Controllers\LeadController;
use KissanCares\Controllers\BuyerController;

Dotenv::createImmutable(__DIR__ . '/..')->safeLoad();

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$r = new Router();

// Strip optional /api prefix
$r->prefix = '/api';

// AUTH
$r->post('/auth/login',     [AuthController::class, 'login']);
$r->post('/auth/logout',    [AuthController::class, 'logout']);
$r->get ('/auth/me',        [AuthController::class, 'me']);
$r->post('/auth/send-otp',  [AuthController::class, 'sendOtp']);
$r->post('/auth/verify-otp',[AuthController::class, 'verifyOtp']);

// CATALOG
$r->get('/products',            [ProductController::class, 'list']);
$r->get('/products/{slug}',     [ProductController::class, 'bySlug']);
$r->get('/products/{id}/fbt',   [ProductController::class, 'fbt']);
$r->get('/products/{id}/stock', [ProductController::class, 'stock']);
$r->get('/search/suggest',      [ProductController::class, 'suggest']);
$r->get('/categories',          [ProductController::class, 'categories']);
$r->get('/crops',               [ProductController::class, 'crops']);

// CART & QUOTE
$r->get ('/cart',        [CartController::class, 'get']);
$r->put ('/cart',        [CartController::class, 'set']);
$r->post('/cart/quote',  [CartController::class, 'quote']);

// ORDERS (buyer)
$r->post('/orders',                  [OrderController::class, 'create']);
$r->get ('/me/orders',               [OrderController::class, 'mine']);
$r->get ('/orders/{id}',             [OrderController::class, 'get']);
$r->get ('/orders/{id}/tracking',    [OrderController::class, 'tracking']);
$r->post('/orders/{id}/reorder',     [OrderController::class, 'reorder']);

// BUYER (profile, addresses, wishlist, coins, notif prefs, crop profile, referral)
$r->get   ('/me/profile',              [BuyerController::class, 'getProfile']);
$r->put   ('/me/profile',              [BuyerController::class, 'updateProfile']);
$r->get   ('/me/addresses',            [BuyerController::class, 'listAddresses']);
$r->post  ('/me/addresses',            [BuyerController::class, 'createAddress']);
$r->put   ('/me/addresses/{id}',       [BuyerController::class, 'updateAddress']);
$r->delete('/me/addresses/{id}',       [BuyerController::class, 'deleteAddress']);
$r->get   ('/me/wishlist',             [BuyerController::class, 'listWishlist']);
$r->post  ('/me/wishlist',             [BuyerController::class, 'addWishlist']);
$r->delete('/me/wishlist/{productId}', [BuyerController::class, 'removeWishlist']);
$r->get   ('/me/coins',                [BuyerController::class, 'coinsBalance']);
$r->get   ('/me/coins/history',        [BuyerController::class, 'coinsHistory']);
$r->post  ('/coins/redeem',            [BuyerController::class, 'redeemCoins']);
$r->get   ('/me/referral',             [BuyerController::class, 'referral']);
$r->get   ('/me/notification-prefs',   [BuyerController::class, 'notifPrefs']);
$r->put   ('/me/notification-prefs',   [BuyerController::class, 'updateNotifPrefs']);
$r->get   ('/me/notifications',        [BuyerController::class, 'inbox']);
$r->post  ('/me/notifications/{id}/read', [BuyerController::class, 'markRead']);
$r->get   ('/me/crop-profile',         [BuyerController::class, 'getCropProfile']);
$r->put   ('/me/crop-profile',         [BuyerController::class, 'updateCropProfile']);

// REVIEWS / Q&A / QUOTES / RETURNS / UPLOADS
$r->get   ('/products/{id}/reviews',   [BuyerController::class, 'listReviews']);
$r->post  ('/products/{id}/reviews',   [BuyerController::class, 'createReview']);
$r->get   ('/products/{id}/questions', [BuyerController::class, 'listQuestions']);
$r->post  ('/products/{id}/questions', [BuyerController::class, 'askQuestion']);
$r->post  ('/quotes',                  [BuyerController::class, 'createQuote']);
$r->post  ('/returns',                 [BuyerController::class, 'createReturn']);
$r->post  ('/uploads/sign',            [BuyerController::class, 'signUpload']);

// Loyalty grant (admin)
$r->post  ('/admin/loyalty/grant',     [AdminController::class, 'grantCoins']);

// SELLER
$r->get  ('/seller/kpis',                [SellerController::class, 'kpis']);
$r->get  ('/seller/products',            [SellerController::class, 'products']);
$r->patch('/seller/products/{id}/stock', [SellerController::class, 'setStock']);
$r->get  ('/seller/orders',              [SellerController::class, 'orders']);
$r->patch('/seller/orders/{id}/status',  [SellerController::class, 'setOrderStatus']);
$r->get  ('/seller/payouts',             [SellerController::class, 'payouts']);
$r->post ('/seller/applications',        [SellerController::class, 'apply']);

// ADMIN
$r->get   ('/admin/kpis',                [AdminController::class, 'kpis']);
$r->get   ('/admin/orders',              [AdminController::class, 'orders']);
$r->patch ('/admin/orders/{id}/status',  [AdminController::class, 'setOrderStatus']);
$r->post  ('/admin/orders/{id}/refund',  [AdminController::class, 'refundOrder']);
$r->get   ('/admin/products',            [AdminController::class, 'products']);
$r->post  ('/admin/products',            [AdminController::class, 'saveProduct']);
$r->put   ('/admin/products',            [AdminController::class, 'saveProduct']);
$r->delete('/admin/products/{id}',       [AdminController::class, 'deleteProduct']);
$r->get   ('/admin/sellers',             [AdminController::class, 'sellers']);
$r->patch ('/admin/sellers/{id}/status', [AdminController::class, 'setSellerStatus']);
$r->get   ('/admin/customers',           [AdminController::class, 'customers']);
$r->post  ('/admin/customers/{id}/coins',[AdminController::class, 'adjustCoins']);
$r->post  ('/admin/customers/{id}/block',[AdminController::class, 'toggleBlock']);
$r->get   ('/admin/coupons',             [AdminController::class, 'coupons']);
$r->post  ('/admin/coupons',             [AdminController::class, 'saveCoupon']);
$r->put   ('/admin/coupons',             [AdminController::class, 'saveCoupon']);
$r->delete('/admin/coupons/{id}',        [AdminController::class, 'deleteCoupon']);
$r->get   ('/admin/categories',          [AdminController::class, 'categories']);
$r->post  ('/admin/categories',          [AdminController::class, 'saveCategory']);
$r->delete('/admin/categories/{id}',     [AdminController::class, 'deleteCategory']);
$r->get   ('/admin/crops',               [AdminController::class, 'crops']);
$r->post  ('/admin/crops',               [AdminController::class, 'saveCrop']);
$r->delete('/admin/crops/{id}',          [AdminController::class, 'deleteCrop']);
$r->get   ('/admin/content',             [AdminController::class, 'content']);
$r->post  ('/admin/content',             [AdminController::class, 'saveContent']);
$r->delete('/admin/content/{id}',        [AdminController::class, 'deleteContent']);
$r->get   ('/admin/reviews',             [AdminController::class, 'reviews']);
$r->patch ('/admin/reviews/{id}/status', [AdminController::class, 'setReviewStatus']);
$r->get   ('/admin/leads',               [AdminController::class, 'leads']);
$r->post  ('/admin/leads/{id}/handled',  [AdminController::class, 'markLeadHandled']);
$r->get   ('/admin/notifications',       [AdminController::class, 'broadcasts']);
$r->post  ('/admin/notifications/broadcast', [AdminController::class, 'sendBroadcast']);
$r->get   ('/admin/settings',            [AdminController::class, 'settings']);
$r->put   ('/admin/settings',            [AdminController::class, 'saveSettings']);
$r->get   ('/admin/loyalty/rules',       [AdminController::class, 'loyaltyRules']);
$r->put   ('/admin/loyalty/rules',       [AdminController::class, 'saveLoyaltyRules']);
$r->get   ('/admin/audit',               [AdminController::class, 'audit']);

// LEADS / EVENTS
$r->post('/leads',  [LeadController::class, 'capture']);
$r->post('/events', [LeadController::class, 'event']);

$r->dispatch();
