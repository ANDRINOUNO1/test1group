import { Router } from 'express';
import { CustomerService } from './user.service';

const router = Router();
const customerService = new CustomerService();

router.get('/customers', async (req, res, next) => {
    try { res.json(await customerService.getAll()); }
    catch (err) { next(err); }
});
 
router.get('/customers/:id', async (req, res, next) => {
    try { res.json(await customerService.getById(Number(req.params.id))); }
    catch (err) { next(err); }
});

router.post('/customers', async (req, res, next) => {
    try {
        await customerService.create(req.body);
        res.json({ message: "Customer created" });
    }
    catch (err) { next(err); }
});

router.put('/customers/:id', async (req, res, next) => {
    try { res.json(await customerService.update(Number(req.params.id), req.body)); }
    catch (err) { next(err); }
});

router.delete('/customers/:id', async (req, res, next) => {
    try { res.json(await customerService.delete(Number(req.params.id))); }
    catch (err) { next(err); }
});

export default router;